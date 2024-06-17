import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.backgroundMain
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  mainButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.primary,
  },
  largeWhiteText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  whiteText:{
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
  button: {
      height: 80,
      width: 150,
      backgroundColor: Colors.primary,
      elevation: 4,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 5,
    },

  pillButton: {
    backgroundColor: Colors.add,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 80,
    width: 150,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

});

