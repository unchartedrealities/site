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

const event1: Document = {

    id: 'event1',

    type: 'events',

    imgSrc: eventsDefaultSrc,

    author: 'Michael Pagnotta',

    date: 'July 23, 2018',

    title: 'Uncharted Realities will be at the Washington County Fair July 26-29',

    body: `Bring all your friends and family for a great time!
    Find us across from the Steak Fry dining area going toward the
    Bugology area and try one of our exciting experiences.`

};

export const documents: Document[] = [news1, event1];
