import { Component, OnInit} from '@angular/core';
import { News, Events } from '../../Interfaces/interfaces';
import {DocumentService} from '../../Services/document.service';
import {Document} from '../../DummyData/news&events';
import {format, startOfDay} from 'date-fns';
import * as compose from 'lodash/fp/compose';
import * as curry from 'lodash/fp/curry';
import * as $ from 'jquery';
import { ComponentFixture } from '@angular/core/testing';
@Component({
  selector: 'app-news-and-events',
  templateUrl: './news-and-events.component.html',
  styleUrls: ['./news-and-events.component.scss']
})
export class NewsAndEventsComponent implements OnInit {
  view: string;
  /****************************Scrolling*******************/
  prevView: string; // used when closing a document to get previous view
  prevCardId: string; // used when returning user to previous view to scroll to last viewed card
  prevScrollPosition: number;
  /****************************View and Select Document*******************/
  activeDocument: Document; // document selected for reading by  user
  documents: any[]; // all documents that've been loaded for a specific view
  incomingDocuments: any; // documents loaded from database
  /*******************For Pagination Of Docs********************/
  dateUBoundNews: number; // API returns news with date <= dateUBoundNews
  numRowsNews: number; // Total number rows in docs table
  newsNumDocsReturned: number; // Used to prevent loading when the last doc in news table already loaded
  dateUBoundEvents: number; // API returns news with date <= dateUBoundNews
  numRowsEvents: number; // Total number rows in events table
  eventsNumDocsReturned: number; // Used to prevent loading when the last doc in events table already loaded

  constructor(private docApi: DocumentService) {
    this.view = 'news';
    this.newsNumDocsReturned = 0;
    this.documents = compose(
      curry(this.filterLocalDocs)('news'),
      this.docApi.getLocalDocs
    )();
    /*
    this.documents = [];
    this.dateUBoundNews = parseInt(format(new Date(), 'YYYYMMDD'), 10);
    this.dateUBoundEvents = parseInt(format(new Date(), 'YYYYMMDD'), 10);
    this.getNewsDocs(this.dateUBoundNews);
    this.getNumRowsNews();
    this.getNumRowsEvents(); */
  }
  ngOnInit() {
    this.trackScroll();
  }
  filterLocalDocs(type: string, documents: Document[]): Document[] {
    return documents.filter((document) => document.type === type);
  }
  getFormattedDocs(existing: any[], incoming: any[]): any[] {
    /*
      + Format Incoming Docs so that date displays correctly
    */
    const formatted = incoming.map(document => {
      const formDoc = Object.assign({}, document);
      const date = document.date;
      const year = parseInt(date.substring(0, 4), 10) - 1;
      const month = parseInt(date.substring(4, 6), 10);
      const day = parseInt(date.substring(6), 0);
      formDoc.date = format(new Date(year, month, day), 'MMMM DD, YYYY');
      return formDoc;
    });
    return existing.concat(formatted);
  }
  removeArrDuplicates(arr: any[]) {
   return arr.reduce((x, y) => x.findIndex(e => e.id === y.id) < 0 ? [...x, y] : x, []);
  }
  getDocumentIndex(docs) {
    this.newsNumDocsReturned = this.newsNumDocsReturned + docs.length;
  }
  getEarliestDate(arr) {
    return arr.reduce((prev, next) => {
      if (parseInt(next, 10) <= parseInt(prev, 10)) {
        return next;
      } else {
        return prev;
      }
    }, arr[0]);
  }
  async getNewsDocs(dateUBound: number) {
    const newsDocs = await this.docApi.selectFromNewsDB(dateUBound);
    const incoming = newsDocs.records;
    const existing = this.documents;
     const getUniqueFormattedDocs = compose(
      this.removeArrDuplicates,
      this.getFormattedDocs
    );
    this.documents = getUniqueFormattedDocs(existing, incoming);
    this.dateUBoundNews = this.getEarliestDate(incoming);
  }
  async getEventsDocs(dateUBound: number) {
    const eventsDocs = await this.docApi.selectFromEventsDB(dateUBound);
    const incoming = eventsDocs.records;
    const existing = this.documents;
    const getUniqueFormattedDocs = compose(
      this.removeArrDuplicates,
      this.getFormattedDocs
    );
    this.documents = getUniqueFormattedDocs(existing, incoming);
    this.dateUBoundEvents = this.getEarliestDate(incoming);
  }
  async getNumRowsNews() {
    const count = await this.docApi.getNumRowsNewsDB();
    this.numRowsNews = count;
  }
  async getNumRowsEvents() {
    const count = await this.docApi.getNumRowsEventsDB();
    this.numRowsEvents = count;
  }
  trackScroll(): void {
    const scrollContainer = document.getElementsByClassName('scroll-container')[0];
    scrollContainer.addEventListener('scroll', () => {
      const scrollTop = scrollContainer.scrollTop;
        if (this.view !== 'readMore') {
          this.prevScrollPosition = scrollTop;
        }
    }, true);
  }
  toggleView(type, ...args): void {
    /*
      + Allows users to switch between 'news' and 'events' views
      + 'news' view will show news documents
      + 'events' view will show events documents
      + prevView refers to only an 'event' or 'news' page and is thus only set on those types
        It iwas used when closing 'readMore' document
    */
   this.prevView = this.view;
   switch (type) {
     case 'news':
      this.documents = [];
      this.documents = compose(
        curry(this.filterLocalDocs)('news'),
        this.docApi.getLocalDocs
      )();
      break;
     case 'events':
      this.documents = [];
      this.documents = compose(
        curry(this.filterLocalDocs)('events'),
        this.docApi.getLocalDocs
      )();
      break;
    default:
      const elemId: string = args[0];
      const doc: Document = args[1];
      this.prevCardId = elemId;
      this.activeDocument = doc;
      setTimeout(() => {
        const scrollContainer = document.getElementsByClassName('scroll-container')[0];
        const prevCard =  document.getElementById(this.prevCardId);
        scrollContainer.scrollTop = 0;
      }, 10);
      break;
   }
    this.view = type;
  }
  toggleViewDB(type, ...args): void {
    /*
      + Allows users to switch between 'news' and 'events' views
      + 'news' view will show news documents
      + 'events' view will show events documents
      + prevView refers to only an 'event' or 'news' page and is thus only set on those types
        It iwas used when closing 'readMore' document
    */
   switch (type) {
     case 'news':
      this.documents = [];
      this.prevView = 'news';
      this.getNewsDocs(this.dateUBoundNews);
      break;
     case 'events':
      this.documents = [];
      this.prevView = 'events';
      this.getEventsDocs(this.dateUBoundEvents);
      break;
    default:
      const elemId: string = args[0];
      const document: Document = args[1];
      this.prevCardId = elemId;
      this.activeDocument = document;
      break;
   }
    this.view = type;
  }
  closeDocument(): void {
    /*
      + Sets view state back to the user's previous view state before clicking on a 'readMore' button
      + Requires timeout in order to allow the 'news' or 'events' view to populate DOM
      + Without timeout, scrollIntoView won't work and user's view will be reset to top of page!!!
    */
    this.view = this.prevView;
    const id = this.prevCardId;
    const prevScrollPosition = this.prevScrollPosition;
    setTimeout(() => {
      const scrollContainer = document.getElementsByClassName('scroll-container')[0];
      const prevCard =  document.getElementById(this.prevCardId);
      scrollContainer.scrollTop = prevScrollPosition;
    }, 10);
  }
}
