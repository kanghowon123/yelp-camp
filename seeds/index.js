const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

// 이 로직은 오류를 확인하고 오류 없이 제대로 열렸다면 연결 문구를 출력함
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// 데이터베이스를 초기화 시키고 50개의 데이터를 넣음
// mongosh
// use yelp-camp
// db.campgrounds.find()
const seedDB = async () => {
  await Campground.deleteMany({}); 
  for(let i = 0; i < 300; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // 사용자 ID
      author: '67da4c4443afb28dc62d58fd',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus sed quae facilis fuga officia ea repellendus. Labore eos similique animi iure repudiandae maiores, laudantium culpa amet officia, ut hic aspernatur.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/doo6p8yz4/image/upload/v1743404867/YelpCamp/bpnjkss6dnf3uilcsmyf.jpg',
          filename: 'YelpCamp/bpnjkss6dnf3uilcsmyf'
        },
        {
          url: 'https://res.cloudinary.com/doo6p8yz4/image/upload/v1743404868/YelpCamp/fgxhkt38vlcu7oyek21f.jpg',
          filename: 'YelpCamp/fgxhkt38vlcu7oyek21f'
        }
      ]
    })
    await camp.save();
  }
}

seedDB();
