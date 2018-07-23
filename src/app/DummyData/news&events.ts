export interface Document {
    id: string; // each document requires a unique id
    type: string; // values can be 'events' or 'news' only!
    imgSrc: string; // the file location of the document's picture
    date: string; // date will be printed in view exactly as it's typed here
    author: string;  
    title: string;
    body: string;
}
const newsDefaultSrc = 'assets/Images/backgrounds/events/location.jpg';
const eventsDefaultSrc = 'assets/Images/backgrounds/events/bigfairfunlogo.jpg';
const defaultAuthor = 'Michael Pagnotta';
const news1: Document = {
    id: 'news1',
    type: 'news',
    imgSrc: newsDefaultSrc,
    date: 'June 30, 2018',
    author: defaultAuthor,
    title: `Uncharted Realites lands its new space in Downtown Portland`,
    body: `In June, Uncharted Realities committed to a 3400 square foot facility on the corner of Salmon and SW 3rd Avenue.  
    Work is now underway to prepare the new state of the art facility for its launch in a few weeks.  We'll make the formal
    announcement of our Launch Day once final project schedules are completed.  Stay tuned for discounts and offers.  Follow 
    us on Facebook, Twitter, and Instagram as we keep the friends of UR informed of our progress.`
};
/* const news2: Document = {
    id: 'news2',
    type: 'news',
    imgSrc: newsDefaultSrc,
    date: 'July 8, 2018',
    author: defaultAuthor,
    title: 'New Samsung VR Out Today',
    body: `In 1998, Google co-founders Larry Page and Sergey Brin added a stick figure drawing
    to their company’s homepage as a fun way to let visitors know they were out of office attending
     the Burning Man festival in Nevada. This gave rise to the company’s famous Google Doodles,
      which are usually designed to honor important historical events, influential people,
       and holidays, and have become a mainstay for the search engine ever since.

       Now, 20 years later, Google is launching its first ever Doodle in virtual reality to celebrate
        Georges Méliès, the French filmmaker and illusionist that some have called the
         “father of special effects.” Google is timing the Doodle’s launch to
          coincide with the release date of one of Méliès’ popular works,
           “À la conquête du pôle (The Conquest of the Pole),” which was released in 1912.`
};
const news3: Document = {
    id: 'news3',
    type: 'news',
    imgSrc: newsDefaultSrc,
    date: 'July 8, 2018',
    author: defaultAuthor,
    title: 'New Samsung VR Out Today',
    body: `In 1998, Google co-founders Larry Page and Sergey Brin added a stick figure drawing
    to their company’s homepage as a fun way to let visitors know they were out of office attending
     the Burning Man festival in Nevada. This gave rise to the company’s famous Google Doodles,
      which are usually designed to honor important historical events, influential people,
       and holidays, and have become a mainstay for the search engine ever since.

       Now, 20 years later, Google is launching its first ever Doodle in virtual reality to celebrate
        Georges Méliès, the French filmmaker and illusionist that some have called the
         “father of special effects.” Google is timing the Doodle’s launch to
          coincide with the release date of one of Méliès’ popular works,
           “À la conquête du pôle (The Conquest of the Pole),” which was released in 1912.`
};  */
const event1: Document = {
    id: 'event1',
    type: 'events',
    imgSrc: eventsDefaultSrc,
    author: 'Michael Pagnotta', 
    date: 'July 23, 2018',
    title: 'Uncharted Realities will be at the Washington County Fair July 26-29',
    body: `Bring all your friends and family for a great time!  Find us across from the Steak Fry dining area going toward the Bugology area and try one of our exciting experiences.`
};
/*const event2: Document = {
    id: 'event2',
    type: 'events',
    imgSrc: eventsDefaultSrc,
    author: defaultAuthor,
    date: 'July 11, 2018',
    title: 'Uncharted Realities Event 2',
    body: 'Uncharted Realities is havingn an event. Bring all your friends and family for a great time!' +
    'The event begins at 12pm sharp so please be on time as not to miss out on any of the virtual action.'
};
const event3: Document = {
    id: 'event3',
    type: 'events',
    imgSrc: eventsDefaultSrc,
    author: defaultAuthor,
    date: 'July 11, 2018',
    title: 'Uncharted Realities Event 3',
    body: 'Uncharted Realities is havingn an event. Bring all your friends and family for a great time!' +
    'The event begins at 12pm sharp so please be on time as not to miss out on any of the virtual action.'
};  */               /*Document[] = [news1, news2, news3, event1, event2, event3];*/ 
export const documents: Document[] = [news1, event1];  