import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import $ from 'jquery';
// import fs from 'fs';

class FileUploader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      img: '',
      imgName: '',
      imgSize: ''
    }
  }
  uploadAndSend() {
    let newFile = document.getElementById('myFile').files[0];
    let data = new FormData();
    data.append('file', newFile, newFile.name.slice(0, -4));
    let config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      }
    }
    console.log('Data: ', data, ' | Config: ', config);
    axios.post('/image', data, config)
      .then((response) => {
        // console.log('response: ', response)
        // document.getElementById('imageText').innerHTML = `<p id = 'imageText'>Your document has been saved to your filesystem.</p>`;
      }).catch((error) => {
        //handle error
      });
  }
  onGoogle () {
    // Stubbed out function: I want it to be able to display the text of the document and the image once everything has been processed
  }
  render () {
    if (this.state.img === '') { // conditional render
      return (
        <div id = 'file_upload'>
            <h2> Upload your file: </h2>
            <div id = 'fileHolder'>
                <input type="file" id="myFile" multiple size="1" onChange={this.uploadAndSend.bind(this)} accept ="image/*"/>
                <img id = 'imageUploaded' src = '#' alt =''/>
            </div>
        </div>
      );
    } else {
      return (
        <div id = 'file_upload'>
            <h2> Upload your file: </h2>
            <div id = 'fileHolder'>
                <input type="file" id="myFile" multiple size="1" onChange={this.uploadAndSend.bind(this)} accept ="image/*"/>
                <br/>
                <img id = 'imageUploaded' src = {this.state.img} alt =''/>
                <br/>
                <button id = 'googleButton' onClick = {this.onGoogle.bind(this)}> Click me to get your document </button>
                <br/>
                <p id = 'imageText'></p>
            </div>
        </div>
    );
    }
  }
}

export default FileUploader;