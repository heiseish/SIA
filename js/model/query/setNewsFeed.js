//@flow
'use-strict';
import firebase from '../';
const newsRef = firebase.database().ref('news');
let feed = {

  id: 1,
  author: "Andrew",
  date: "03 July 2016",
  text: "Good morning guys",
  image: "https://www.fitness.com/images/new/banner-1.jpg"

}
export default setNewsFeed = () => {
  return new Promise((response) => {
    firebase.database().ref('newsFeed/1' ).set(feed)
    response();
  })
}
