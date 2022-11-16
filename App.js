import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from './components/ImageViewer'
import Button from './components/Button';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';


const PlaceholderImage = require('./assets/bgimg.png')
export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState(null)

  const onReset = () => {setShowAppOptions(false)};
  const onModalClose = () => {setIsModalVisible(false)};
  const onAddSticker = () => {
    setIsModalVisible(true)
  };
  const onSaveImageAsync = async () => {
  };

  const pickImageAsync = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
      quality:1,
    });

    if (!result.cancelled){
      setShowAppOptions(true);
      setSelectedImage(result.uri);
      console.log(result);
    } else {
      alert('did not select any image')
    }
  }
  return (
    <View style={styles.container}>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose} > 
        <EmojiList onCloseModal = {} onSelect = pick
      </EmojiPicker>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style = {styles.optionsRow}>
            <IconButton icon = 'refresh' label = 'Reset' onPress={onReset}/>
            <CircleButton onPress={onAddSticker} />
            <IconButton icon = 'save-alt' label = 'Save' onPress={onSaveImageAsync}/>
          </View>
        </View>
      ):(
      <View style={styles.footerContainer} >
        <Button label={"Choose a photo"} theme={"primary"} onPress={pickImageAsync} />
        <Button label={"Use this photo"} onPress={() => setShowAppOptions(true)} />
      </View>
      )}
      <StatusBar style="inverted" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    // width:'100%'
  },
  imageContainer: {
    // backgroundColor:"green",
    flex: 1,
    paddingTop:58,
  },
  footerContainer: {
    // backgroundColor:"yellow",
    flex:1/3,
    alignItems:'center',
  },
  optionsContainer: {
    // backgroundColor:"yellow",
    position:'absolute',
    bottom:80,
  },
  optionsRow: {
    // backgroundColor:"yellow",
    alignItems:'center',
    flexDirection:'row'
  },

});
