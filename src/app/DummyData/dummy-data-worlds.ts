/*
    Info Interface Notes
    label: the label text that will be displayed on the Experience Profile
    text:  use this when you want to have raw text displayed
    ***OR***
    data: use this when you have multiple items you'd like to display. An experience with multiple
    Categories is a great example for what the data field could be used for
    ex: {label: 'Categories', data: ['Outdoors' , 'Exploration', 'Adventure']}
*/

interface Info {
    label: string;
    text?: string;
    data?: string[];
}
interface Profile {
    src: string;
    title: string;
    info: Info[];
    bio: string;
}

const experienceTemplate: Profile = {

    title: 'Title of experience',

    src: 'assets/Images/Path_of_Experience',

    info: [

        {label: 'Some Label To Display', text: 'Text to display'},

        {label: 'A Label To Display', data: ['data1', 'data2']}

    ],

    bio: `Some bio text to display. The paragraphs describing the experience go here. Keep in mind

    these are **NOT** single quotes like the rest of the strings. These are the accent mark located under your

    escape key. This allows you to have a multi-line string without having to jump through hoops!`

};

const experienceSrc = 'assets/Images/worlds/';

const experience0: Profile = {
    title: 'PACKAGES AND PRICING - READ FIRST!!',
    src: `${experienceSrc}adventure_3.jpg`,
    info: [
    /*    {label: 'Image From', text: 'VR Santa Monica Helicopter Flight'},
        {label: 'Developer', text: 'press360'},
        {label: 'Genre', data: ['Travel and Exploration']}, */
    ], 
    bio: `When you come to Uncharted Realities, we believe in discussing your needs and interests one-on-one so that we can help you get the most from your visit.
    
    You will first choose your category and we'll discuss our experiences.  You can then determine if you want our Introductory($19), Standard($29), or Extended Packages($39).
    
    The longer your stay, the better value of your package.  Discounts also available when you bring a group of 6 or more!
    
    For our repeat customers who expect to return on a regular basis (ex. fitness programs, large-scale saveable adventures), we have monthly subscriptions available.
    
    We welcome tour groups, birthday parties, educational classes, along with corporations and professionals who would like a new and unique approach to everyday activities.`
};


const experience1: Profile = {
    title: 'Travel and Exploration',
    src: `${experienceSrc}SantaMonica.jpg`,
    info: [
        {label: 'Image From', text: 'VR Santa Monica Helicopter Flight'},
        {label: 'Developer', text: 'press360'},
        {label: 'Genre', data: ['Travel and Exploration']},
    ],
    bio: `Whether it be current, in the past, or visions of the future, there is no shortage of new
    places to visit in our Travel Experiences.`
};
const experience2: Profile = {
    title: 'Sports and Fitness',
    src: `${experienceSrc}Everyday-Golf-VR.jpg`,
    info: [
        {label: 'Image From', text: 'Everyday Golf VR'},
        {label: 'Developer', text: 'Wisecat'},
        {label: 'Genre', data: ['Sports and Fitness']}
    ],

    bio: `Sports and Fitness covers everything from participating in your favorite sport, 
    trying one you've never done, or getting a high intensity workout instead of going to the gym, 
    our selections are sure to deliver the experience you want.`
};
const experience3: Profile = {
    title: 'Escape Rooms and Strategy',
    src: `${experienceSrc}Tales of Escape.jpg`,
    info: [
        {label: 'Image From', text: 'Tales of Escape'},
        {label: 'Developer', text: 'On Skull'},
        {label: 'Genre', data: ['Escape Rooms and Strategy']}
    ],

    bio: `If you enjoy being intellectually challenged with a twist of urgency or fear,
     we have a multitude of puzzle experiences.  We have a large variety of Escape Rooms to
     keep you coming back for more and other strategy games to satisfy your need to complete quests,
     solve puzzles, and test your wits.`
};
const experience4: Profile = {
    title: 'Games and Adventures',
    src: `${experienceSrc}Space Pirate Trainer.jpg`,
    info: [
        {label: 'Image From', text: 'Space Pirate Trainer'},
        {label: 'Developer', text: 'I-Illusions'},
        {label: 'Genre', data: ['Games and Adventure']}
    ],
    bio: `Our immersive recreation center has no shortage of VR games and adventures.
      From shooters to role playing adventures, including multi-player and co-op configurations,
       we have every imaginable enemy to battle against and quests to complete.`
};
const experience5: Profile = {
    title: 'Simulations and Training',
    src: `${experienceSrc}Aerofly FS2.jpg`,
    info: [
        {label: 'Image From', text: 'Aerofly FS2 VR'},
        {label: 'Developer', text: 'IPACS'},
        {label: 'Genre', data: ['Simulations and Training']}
    ],

    bio: `With the power of simulation, these experiences allow you to do things never before possible.
     The unattainable in real life is now laid at your doorstep.  You only have to step inside.
       Drive a Formula One race car or fly a high speed jet.  Our selections will allow to finish your bucket list.`
};
const experience6: Profile = {
    title: 'Science',
    src: `${experienceSrc}Mars 2030.png`,
    info: [
        {label: 'Image from', text: 'Mars 2030 VR'},
        {label: 'Developer', text: 'FMG Studios'},
        {label: 'Genre', data: ['Science']}
    ],
    bio: `If you love science, then our experiences will definitely take it to the next level.
     Two and three dimensions become four as you are inserted into the scientific realm.
      Experience our world in a brand new way and travel to the far reaches of the cosmos.`
};
const experience7: Profile = {
    title: 'Art and Design',
    src: `${experienceSrc}Tilt Brush Sarah Northway.png`,
    info: [

        {label: 'Image from', text: 'Tilt Brush'},
        {label: 'Developer', text: 'Google Inc'},
        {label: 'Image By', text: 'Sarah Northway'},
        {label: 'Genre', data: ['Art and Design']}
    ],
    bio: `If you have a creative flair or if you just like to doodle, our art and design selections
     put you right in the middle of the action of your masterpieces. Paint, draw, sculpt, build,
      and engineer in a way you've never experienced before.
        See all the engine's parts floating in front of you, step inside your 3D creation
         and move it around, the fun never stops when your inner artist reveals itself.`
};
const experience8: Profile = {
    title: 'Education',
    src: `${experienceSrc}Organon VR Anatomy.jpg`,
    info: [

        {label: 'Image From', text: '3d Organon VR Anatomy'},
        {label: 'Developer', text: 'Medis Media'},
        {label: 'Genre', data: ['Education']}

    ],
    bio: `Students, young and old, will love this new way to learn and we imagine that
     memory retention rates just might get higher. Our selections bring a new meaning
      to the phrase "hands on"!  Textbooks and their pretty pictures are a thing of
       the past when you can learn a new subject by being there, even at microscopic
        levels!  If you have a thirst for knowledge, try our educational experiences
         and impress family and friends with your new found expertise.`
};
const experience9: Profile = {
    title: 'Multi-player, Teams and Co-ops',
    src: `${experienceSrc}Run of Mydan2.jpg`,
    info: [
        {label: 'Image from', text: 'Run of Mydan'},
        {label: 'Developer', text: 'Virtew.it'},
        {label: 'Genre', data: ['Multi-player, Teams and Co-ops']}
    ],
    bio: `It's twice the fun to do our experiences with others.
     We provide the ultimate in social engineering when you descend
      into an experience and need to work with (or against!) your family,
       friends, co-workers, or even strangers on the other side of the world.
        We offer a variety of situations that fit your needs - shared, cooperative,
         arena-style, and competitive.  If you are looking to do something new with
          those you spend time with, ask about our offerings to get you into the action together.`
};
export const worldsDummy: Profile[] = [

    experience0, experience1, experience2, experience3, experience4, experience5, experience6,

    experience7, experience8, experience9

];
