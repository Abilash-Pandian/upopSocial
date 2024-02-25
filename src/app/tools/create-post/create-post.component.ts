import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  selectedImageFile :File | null=null ;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  constructor(private dialog: MatDialogRef<CreatePostComponent>) { }

  ngOnInit(): void {
  }

  onPostClick(commentInput: HTMLTextAreaElement) {
    let comment = commentInput.value;
    if(comment.length <= 0 ) return;
    if(this.selectedImageFile) {
      this.uploadImagePost(comment);
    } else {
      this.uploadPost(comment);
    }
   
  }

  uploadImagePost(comment: string){
    let postId = this.firestore.genDocId();
    this.storage.upload(
      {
        uploadName: "upload Image Post",
        path: ["Posts", postId, "image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete: (downloadUrl) => {
          this.firestore.create(
            {
              path: ["Posts", postId],
              data: {
                comment: comment,
                creatorId: this.auth.getAuth().currentUser?.uid,
                imageUrl: downloadUrl,
                timestamp: FirebaseTSApp.getFirestoreTimestamp()
              },
              onComplete: (docId) => {
                this.dialog.close();
              }
            }
          );
        }
      }
    );
  }

  uploadPost(comment: string){
    this.firestore.create(
      {
        path: ["Posts"],
        data: {
          comment: comment,
          creatorId: this.auth.getAuth().currentUser?.uid,
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docId) => {
          this.dialog.close();
        }
      }
    );
  }

  
  onPhotoSelected(photoSelector: HTMLInputElement) {
    const files = photoSelector.files;
    
    if (!files || files.length === 0) {
      console.error('No files selected.');
      return;
    }
  
    this.selectedImageFile = files[0];
    
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
  
    fileReader.addEventListener(
      "loadend",
      (ev) => {
        const result = fileReader.result;
  
        if (result && typeof result === 'string') {
          const readableString = result;
          const postPreviewImage = document.getElementById("post-preview-image") as HTMLImageElement;
  
          if (postPreviewImage) {
            postPreviewImage.src = readableString;
          }
        } else {
          console.error('Failed to read file.');
        }
      }
    );
  }
  
}
