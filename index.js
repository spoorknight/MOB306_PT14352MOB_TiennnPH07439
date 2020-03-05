import React, {useState} from 'react';
import { StyleSheet,Text,View,Modal,TextInput,TouchableOpacity,ImageBackground,FlatList} from 'react-native';
import {OutlinedTextField, 
} from 'react-native-material-textfield';
import TruyenTranhItem from './comic/truyentranh';
import { ScrollView } from 'react-native-gesture-handler';

export default function App({navigation}) {

  const allComics ={
      comics:[
        {
          avatar:'http://st.nettruyen.com/data/comics/29/toi-thang-cap-mot-minh.jpg',
          id:'abc1',
          name:'Solo Leveling',
          category:'Supernatural,Action',
          total_chapters:200,
          active: true
        },
        {
          avatar:'http://st.nettruyen.com/data/comics/126/the-gamer.jpg',
          id:'abc2',
          name:'The Gamer',
          category:'Adventure,Comedy,Action,School-life',
          total_chapters:430,
          active: false
        },
        {
          avatar:'http://st.nettruyen.com/data/comics/127/toan-chuc-phap-su.jpg',
          id:'abc3',
          name:'Magicer',
          category:'Action,Mystery,Fantasy',
          total_chapters:50,
          active: false
        },
        {
          avatar:'http://st.nettruyen.com/data/comics/30/conan.jpg',
          id:'abc4',
          name:'Conan',
          category:'Detective,Action',
          total_chapters:100,
          active: false
        },
        {
          avatar:'http://st.nettruyen.com/data/comics/91/doraemon.jpg',
          id:'abc5',
          name:'Doraemon',
          category:'Comedy,Supernatural',
          total_chapters:45,
          active: true
        },
      ]
  }

  const checkValidate = () => {
    if(inputName.toString() == ""){
      setErrorName("Please enter your name");
      return;
    }
    else{
      setErrorName("");
    }



    if(inputAge==""){
      setErrorAge("Please enter your age");
      return;
    }
     else if(parseInt(inputAge.toString()) < 18){
      setErrorAge("Your age must be 18 or older");
      return;
    }
    else {
      setErrorAge("");
    }
    

    setShowModal(false);

  }
  
  
  const [showModal, setShowModal] = useState(true);
  const [inputName, setInputName] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [comic, setComic] = useState(allComics);
  const [errorName, setErrorName] = useState('');
    const [errorAge, setErrorAge] = useState('');

  console.log(comic.comics);

  const handleDeleteComic = (id) => {
    let newComicList = comic.comics;

    newComicList = newComicList.filter((truyen) => truyen.id != id);
    allComics.comics = newComicList;
    setComic(allComics);

  }

  const intent=(item) => {
    navigation.navigate('detail',{data:item});
  }

  return (
    <View >
      <ImageBackground source={{uri:'https://img.freepik.com/vector-gratis/fondo-particulas-tecnologia-realista_23-2148409680.jpg?size=626&ext=jpg'}} style = {styles.imgbg}>
        <ScrollView>
        <View style={styles.container}>
      <Text style={main.head}>Hello {inputName} !</Text>
     
        <FlatList
        data = {comic.comics}
        renderItem={({item})=>  <View>
          <TruyenTranhItem item={item} handleDelete={handleDeleteComic} next={intent} /> 
        </View>}
        keyExtractor={(item,index) => index}/>
       
      <Modal visible={showModal}>
        <ImageBackground source={{uri:'https://img.freepik.com/vector-gratis/fondo-particulas-tecnologia-realista_23-2148409680.jpg?size=626&ext=jpg'}} style = {styles.imgbg}>
        <View style = {styles.full}>
          <Text style={styles.tx}>Enter your info</Text>
          <View style={styles.outlineTextAll}>
        <OutlinedTextField style={styles.outlineText} baseColor="#3399FF" textColor='white' error={errorName} onChangeText={(inputName) => setInputName(inputName)} keyboardType='default' placeholder='Enter your name' />
        <OutlinedTextField style={styles.outlineText} baseColor="#3399FF" textColor='white' error={errorAge}  onChangeText={(inputAge) => setInputAge(inputAge)} keyboardType='number-pad' placeholder='Enter your age' />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => checkValidate()}>
          <Text style={styles.textbtn}>Confirm</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
      </Modal>
      </View>
      </ScrollView>
      </ImageBackground>
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    
  },
  tx:{
    fontStyle:'italic',
    fontSize:30,
    color:'#0066CC',
    bottom:10
  },
  imgbg:{
    width:'100%',
    height:'100%'
  },
 full: {
   alignItems:'center',
   marginTop:200,
    justifyContent: 'center',
 },
 btn:{
  backgroundColor: '#6666FF',
  padding: 10,
  margin: 5,
  height: 40,
  width:100,
  borderRadius:20
 },
 textbtn:{
   fontSize:15,
   color:'white',
   textAlign:'center'
 },
 outlineText:{
   height:35,
   
 },
 outlineTextAll:{
   width:'95%',
   padding:10
 }
});

const main = StyleSheet.create({
  head:{
    textAlign:'center',
    marginTop:20,
    fontSize:25,
    color:'white'
  },
});
