import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import {
  OutlinedTextField,
} from 'react-native-material-textfield';
import RadioForm from 'react-native-simple-radio-button';


import TruyenTranhItem from './comic/truyentranh';
import { ScrollView } from 'react-native-gesture-handler';
import TextTicker from 'react-native-text-ticker';
export default function App({ navigation }) {
  const API = 'http://5e647bf9a49c210016106a00.mockapi.io/api/allComics';

  const [showModal, setShowModal] = useState(true);
  const [inputName, setInputName] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorAge, setErrorAge] = useState('');
  const [category, setCategory] = useState('');
  const [comicName, setComicName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [chapters, setChapters] = useState('');
  const [activePicker, setActivePicker] = useState('');
  const [content, setContent] = useState('');
  const [comics, setComics] = useState([]);
  const [id, setId] = useState('');
  const [showModalAdd, setShowModalAdd] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
 

  const fetchComics = () => {
    return fetch(
      API, // api
      {} // object khai bao method, header(kieu du lieu gui len, kieu du lieu nhan ve), body(data gui len)
    )
      .then((response) => response.json())
      .then((responseJson) => { setComics(responseJson) })
      .catch((error) => console.log(error));
  };

  useEffect(
    () => {
      fetchComics();
    }
    , []
  )

  const checkValidate = () => {
    if (inputName.toString() == "") {
      setErrorName("Please enter your name");
      return;
    }
    else {
      setErrorName("");
    }



    if (inputAge == "") {
      setErrorAge("Please enter your age");
      return;
    }
    else if (parseInt(inputAge.toString()) < 18) {
      setErrorAge("Your age must be 18 or older");
      return;
    }
    else {
      setErrorAge("");
    }


    setShowModal(false);

  }

  const deleteComic = (id) => {
    const newComic = comics.filter(item => item.id != id);
    setComics(newComic);
  }
  const handleDelete = (id) => {
    setShowLoading(true);
    deleteComic(id);

    fetch(
      `${API}/${id}`,
      { method: 'DELETE' }
    ).then(() => {
      setShowLoading(false);
    })
      .catch((error) => console.log(error));
  }

  const handleAdd = (responseJson) => {
    const newComics = [...comics];

    return newComics.push(responseJson);
  }

  const handleUpdate = (responseJson) => {
    const newComics = [...comics];
    const updateComicIndex = newComics.findIndex(item => item.id = responseJson.id);

    newComics[updateComicIndex] = responseJson;
    return newComics;
  }
  const setModalData = (data) => {
    setCategory(data.category);
    setComicName(data.name);
    setAvatar(data.avatar);
    setChapters(data.total_chapters);
    setActivePicker(data.active);
    setContent(data.content);
    setIsUpdate(data.id);
  }

  const handleSubmit = () => {
    setShowLoading(true);
    setShowModalAdd(false);

    const comic = {
      category: category,
      name: comicName,
      avatar: avatar,
      total_chapters: chapters,
      active: activePicker,
      content: content,
    };
    const api = isUpdate ? `${API}/${isUpdate}` : API;
    fetch(
      api,
      {
        method: isUpdate ? 'PUT' : 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(comic)
      }
    ).then((response) => response.json())
      .then((responseJson) => {
        let newComics = [];
        if (isUpdate) {
          newComics = handleUpdate(responseJson);
        } else {
          newComics = handleAdd(responseJson);
        }
        fetchComics();
        setShowLoading(false);
      })
      .catch((error) => console.log(`ERROR: ${error}`));

    setModalData({
      category: '',
      name: '',
      avatar: '',
      total_chapters: '',
      active: '',
      content: ''
    });
  }

  const handleEdit = (id) => {
    const comic = comics.find((item) => item.id == id);
    setModalData(comic);
    setShowModalAdd(true);
  }

  const setComic = (response) => {
    setId(response.id);
    setCategory(response.category);
    setComicName(response.name);
    setAvatar(response.avatar);
    setChapters(response.total_chapters);
    setActivePicker(response.active);
    setContent(response.content);
  }

  const handleCancleModal = () => {
    setShowModalAdd(false);
  }




  const intent = (item) => {
    navigation.navigate('detail', { data: item });
  }
  var radio_props = [
    { label: 'Finished                 ', value: 1 },
    { label: 'Loading', value: 0 }
  ];
  return (
    <View >
      <ImageBackground source={{ uri: 'https://img.freepik.com/vector-gratis/fondo-particulas-tecnologia-realista_23-2148409680.jpg?size=626&ext=jpg' }} style={styles.imgbg}>
        <View style={main.mains}>
          <View style={main.top}>
          <Text style={main.head}  >Hello {inputName}! </Text>
          <TouchableOpacity style={main.button_add} >
            <Text style={main.textBtnAdd} onPress={() => {
              setContent("");
              setShowModalAdd(true)
            }}>ADD STORY</Text>
          </TouchableOpacity>
          </View>
          {
            showLoading
              ? <Text>...</Text>
              : null
          }


          <Modal visible={showModalAdd}>
            <View>
              <ImageBackground source={{ uri: 'https://img.freepik.com/vector-gratis/fondo-particulas-tecnologia-realista_23-2148409680.jpg?size=626&ext=jpg' }} style={styles.imgbg}>
              <View style={modalAdd.modal}>
                <ScrollView>
                    <View>
                      <Text style={modalAdd.textMain}>ADD STORY</Text>
                    </View>
                    <View style={modalAdd.outlineText}>
                    <TextInput style={modalAdd.category_add} keyboardType='default' placeholder='Category' textColor='white' onChangeText={(value) => setCategory(value)} >{category}</TextInput>
                    <TextInput style={modalAdd.category_add} keyboardType='default' placeholder='Name' textColor='white' onChangeText={(value) => setComicName(value)} >{comicName}</TextInput>
                    <TextInput style={modalAdd.category_add} keyboardType='default' placeholder='ImageURL' textColor='white' onChangeText={(value) => setAvatar(value)} >{avatar}</TextInput>
                    <TextInput style={modalAdd.category_add} keyboardType='number-pad' placeholder='Chapters' textColor='white' onChangeText={(value) => setChapters(value)} >{chapters}</TextInput>
                      <RadioForm style={modalAdd.radioForm}  buttonColor={'#2196f3'} formHorizontal={true} labelColor={'white'} selectedLabelColor={'white'} radio_props={radio_props} initial={{activePicker} ? 0 : 1 } onPress={(value) => setActivePicker(value)} />
        <TextInput style={modalAdd.content_add}  keyboardType='default' placeholder='Content' textColor='white' onChangeText={(value) => setContent(value)} >{content}</TextInput>
                    </View>
                    <View style={modalAdd.button}>
                      <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()} >
                        <Text style={styles.textbtn}>SUBMIT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btn} onPress={() => handleCancleModal()} >
                        <Text style={styles.textbtn}>CANCLE</Text>
                      </TouchableOpacity>
                    </View>
                </ScrollView>
                </View>
              </ImageBackground>
            </View>
          </Modal>



        </View>
        <ScrollView>
          <View style={styles.container}>
            
            <FlatList
              data={comics}
              renderItem={({ item }) => <View>
                <TruyenTranhItem item={item} handleDelete={handleDelete} handleEdit={handleEdit} next={intent} />
              </View>}
              keyExtractor={(item, index) => index} />

            <Modal visible={showModal}>
              <ImageBackground source={{ uri: 'https://img.freepik.com/vector-gratis/fondo-particulas-tecnologia-realista_23-2148409680.jpg?size=626&ext=jpg' }} style={styles.imgbg}>
                <View style={styles.full}>
                  <Text style={styles.tx}>Enter your info</Text>
                  <View style={styles.outlineTextAll}>
                    <OutlinedTextField style={styles.outlineText} baseColor="#3399FF" textColor='white' error={errorName} onChangeText={(inputName) => setInputName(inputName)} keyboardType='default' placeholder='Enter your name' />
                    <OutlinedTextField style={styles.outlineText} baseColor="#3399FF" textColor='white' error={errorAge} onChangeText={(inputAge) => setInputAge(inputAge)} keyboardType='number-pad' placeholder='Enter your age' />
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
  top:20
  },
  tx: {
    fontStyle: 'italic',
    fontSize: 30,
    color: '#0066CC',
    bottom: 10
  },
  imgbg: {
    width: '100%',
    height: '100%'
  },
  full: {
    alignItems: 'center',
    marginTop: 200,
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#6666FF',
    padding: 10,
    margin: 5,
    height: 40,
    width: 100,
    borderRadius: 20
  },
  textbtn: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center'
  },
  outlineText: {
    height: 35,

  },
  outlineTextAll: {
    width: '95%',
    padding: 10
  }
});

const main = StyleSheet.create({
  head: {
    right:70,
    marginTop: 15,
    fontSize: 20,
    color: 'white',
    
  },
  button_add: {
    backgroundColor: 'gray',
    padding: 10,
    margin: 5,
    lineHeight: 5,
    width: 100,
    borderRadius: 20,
    height:35,
    top:10,
    right:40
  },
  textBtnAdd: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    height:40
  },
  mains: {
    width: '100%',
    height:50,
    alignItems: 'center'
  },
  top:{
    flex:1,
    flexDirection:'row',
    height:50
  }
}
);
const modalAdd = StyleSheet.create({
  modal: {
    width: '100%',
    marginTop: 20,
    padding: 10,
    height:'100%'
  },
  button: {
    alignItems: 'center'
  },
  textMain: {
    fontSize: 25,
    color: '#2196f3',
    textAlign: 'center'
  },
  outlineText: {
    margin: 10,
  },
  radioForm: {
    left: 40,
  },
  content_add: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2196f3',
    padding:10,
    height:80,
    top:5,
    
  },
  category_add:{  
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2196f3',
    height: 50,
    textAlignVertical: 'top',
    margin:10,
    padding:10
  }
})
