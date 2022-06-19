const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62ac90bd078b6af04e8d0ff5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dagwvbab9/image/upload/v1655658899/YelpCamp/gbv51yaqqe05pdqtslce.jpg',
                    filename: 'YelpCamp/gbv51yaqqe05pdqtslce'
                },
                {
                    url: 'https://res.cloudinary.com/dagwvbab9/image/upload/v1655658901/YelpCamp/thwthwrdurda3vmfluti.jpg',
                    filename: 'YelpCamp/thwthwrdurda3vmfluti'
                },
                {
                    url: 'https://res.cloudinary.com/dagwvbab9/image/upload/v1655658903/YelpCamp/sibtywlmxi3gerx8crgc.jpg',
                    filename: 'YelpCamp/sibtywlmxi3gerx8crgc'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam aliquam maiores pariatur alias aspernatur? Excepturi et minima sint cum earum modi numquam dignissimos dolores eius hic neque cupiditate, facilis velit!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    db.close();
})