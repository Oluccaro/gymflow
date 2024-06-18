import { View, Text, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { deleteStudent, getStudents } from '@/app/api/student';
import { Student } from '@/app/models/StudentModel';

const ListStudent : React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsList = await getStudents();
        setStudents(studentsList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  
  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Student }) => (
    <View className='bg-red-500 p-4 mb-4 rounded'>
      <Text className='text-white text-lg mb-2'>{item.name}</Text>
      <Text className='text-white'>Phone: {item.phone}</Text>
      <View className='flex-row mt-2'>
        <Button
          title="Edit"
          onPress={() => router.push(`/screens/student/update-student?id=${item.id}`)}
          />
        <Button
          title="Delete"
          onPress={() => handleDelete(item.id)}
          />
      </View>
    </View>
  );

  return (
    <View className='bg-black h-full p-4'>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ListStudent