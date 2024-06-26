import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Icons from '@/constants/Icons';

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
  
  spacer: {
    height: 20, // Ajuste a altura do espaçamento conforme necessário
  },

  listContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginTop: 20,
    flex: 0.9
  },

  input: {
      height: 56,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 4,
    },
  inputCadastro: {
    height: 56,
    marginBottom: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
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

  picker: {
      height: 56,
      marginBottom: 12,
      backgroundColor: '#F5F5F5',
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ccc',
  },

  label: {
      color: 'black',
      marginBottom: 2,
    },

  appBar: {
      height: 60,
      backgroundColor: Colors.primary,
      tintColor: Colors.white,
      paddingVertical: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },

  text: {
    fontSize: 16,
    marginBottom: 2,
  },

  noData: {
      padding: 20,
      alignItems: 'center',
    },

  nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'red',
      },

  searchButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: Colors.primary,
        marginBottom: 10,

  },


});

