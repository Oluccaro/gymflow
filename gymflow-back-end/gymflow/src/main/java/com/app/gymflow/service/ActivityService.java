package com.app.gymflow.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.gymflow.model.Activity;
import com.app.gymflow.model.Employee;
import com.app.gymflow.model.Modality;
import com.app.gymflow.model.Schedule;
import com.app.gymflow.repository.ActivityRepository;
import com.app.gymflow.repository.EmployeeRepository;
import com.app.gymflow.repository.ModalityRepository;
import com.app.gymflow.repository.ScheduleRepository;

import jakarta.transaction.Transactional;

@Service
public class ActivityService {
    
  @Autowired
  private ActivityRepository activityRepository;

  @Autowired
  private ModalityRepository modalityRepository;

  @Autowired
  private ScheduleRepository scheduleRepository;

  @Autowired 
  private EmployeeRepository employeeRepository;

  public List<Activity> getAllActivities() {
      return activityRepository.findAll();
  }

  public Optional<Activity> getActivityById(Long id) {
      return activityRepository.findById(id);
  }

  @Transactional
  public Activity createActivity(Activity activity) {
      Modality modality = modalityRepository.findById(activity.getModality().getId())
              .orElseThrow(() -> new RuntimeException("Modality not found with id " + activity.getModality().getId()));
      activity.setModality(modality);

      for (Schedule schedule : activity.getSchedules()) {
          Optional<Employee> optEmployee = employeeRepository.findById(schedule.getEmployee().getId());
          if(optEmployee.isPresent()){
            Employee employee = optEmployee.get();
            schedule.setEmployee(employee);  // Assume Employee is set correctly in the request
            scheduleRepository.save(schedule);
          } else {
            throw new RuntimeException("Employee with id " + schedule.getEmployee().getId() + " not found!");
          }
      }

      return activityRepository.save(activity);
  }

  @Transactional
  public Activity updateActivity(Long id, Activity updatedActivity) {
      Optional<Activity> optionalActivity = activityRepository.findById(id);
      if (optionalActivity.isPresent()) {
          Activity activity = optionalActivity.get();
          activity.setName(updatedActivity.getName());

          Modality modality = modalityRepository.findById(updatedActivity.getModality().getId())
                  .orElseThrow(() -> new RuntimeException("Modality not found with id " + updatedActivity.getModality().getId()));
          activity.setModality(modality);

          activity.getSchedules().clear();
          for (Schedule schedule : updatedActivity.getSchedules()) {
            Optional<Employee> optEmployee = employeeRepository.findById(schedule.getEmployee().getId());
            if(optEmployee.isPresent()){
              Employee employee = optEmployee.get();
              schedule.setEmployee(employee);  // Assume Employee is set correctly in the request
              scheduleRepository.save(schedule);
            } else {
              throw new RuntimeException("Employee not found with id " + schedule.getEmployee().getId());
            }
            activity.getSchedules().add(schedule);
          }

          return activityRepository.save(activity);
      } else {
          throw new RuntimeException("Activity not found with id " + id);
      }
  }

  @Transactional
  public void deleteActivity(Long id) {
      activityRepository.deleteById(id);
  }
}