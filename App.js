import React, { useState } from 'react';
import {SafeAreaView, AppRegistry, Text, TextInput, TouchableOpacity } from 'react-native';
import { View, Button, StyleSheet, FlatList } from "react-native";
import getRealm from './src/RealmConfig';
import { ObjectId } from 'bson';
import { string } from 'prop-types';
import UselessTextInput from './src/AppTextInput';


var noteText = ""
var listData = [{}]
var realm
const App = () => {
  // const [saveText, saveSaveText] = React.useState("jhhgu");
const [count, setCount] = useState(0);
  
const fun = (text) =>{
  noteText = text
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});


const fetchNotes = async() =>  {
  try{
    console.log("fetching notes");
    realm = await getRealm();
    const notesList = realm.objects("Note");
    listData = notesList
    setCount(count+1)
    // Define the collection notification listener
  function listener(notesList, changes) {
    // Update UI in response to deleted objects
    changes.deletions.forEach(index => {
      // Deleted objects cannot be accessed directly,
      // but we can update a UI list, etc. knowing the index.
      let deletedTask = notesList[index];
      console.log("deleted"+index);
      listData = listData.filter(item => item !== deletedTask)
      setCount(count+1)
    });
    // Update UI in response to inserted objects
    changes.insertions.forEach(index => {
      let insertedTasks = notesList[index];
      console.log("inserted"+insertedTasks);
      listData.concat({insertedTasks})
      setCount(count+1)
    });
    // Update UI in response to modified objects
    changes.modifications.forEach(index => {
      let modifiedTask = notesList[index];
      console.log("modified"+modifiedTask);
    });
  }
    notesList.addListener(listener)
    console.log(listData);
  }catch(error){
    console.log(error);
  }
}

const submitNote = async note =>{
  try {  
    // const realm = await getRealm();
    const newNote = {
      _id: new ObjectId(),
      _userId: "aman", // should be same as partitionValue,
      date: 1234,
      noteName: note
    }
  realm.write(() => {
  realm.create("Note", newNote);
        });
      }catch(error){
        console.log(error);
      }
}

 

return (
  // <SafeAreaView style={{flex:1}}>
  //   <NoteStore/>
  // </SafeAreaView>

  
  
  <View >
    <Button style={styles.screenContainer} title="Fetch"  onPress={()=>fetchNotes()}  />
    <UselessTextInput fun = {fun} />  
              
    <Button style={styles.screenContainer} title="Submit"  onPress={()=>submitNote(noteText)}  />

    <FlatList
        data={listData}
        extraData={count}
        renderItem={({item}) => <Text style={styles.item}>{item.noteName}</Text>}
      />
  </View>
);

}
  
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    padding: 16,
    alignSelf: "flex-end",
    marginBottom: 6
  }
});

export default App;
