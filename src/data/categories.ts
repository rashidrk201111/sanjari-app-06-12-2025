export interface Subcategory {
  name: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    name: "DOCUMENTS",
    slug: "documents",
    subcategories: [
      { name: "PDF PRINT", slug: "pdf-print" },
      { name: "ANNUAL REPORT PRINTING", slug: "annual-report-printing" },
      { name: "FITNESS PLAN PRINTING", slug: "fitness-plan-printing" },
      { name: "HOMEWORK WORKSHEET PRINTING", slug: "homework-worksheet-printing" },
      { name: "SURVEY & QUESTIONNAIRE PRINTING", slug: "survey-questionnaire-printing" },
      { name: "SCRIPT PRINTING", slug: "script-printing" },
      { name: "CV/RESUME PRINT", slug: "cv-resume-print" },
      { name: "BILLS/INVOICE PRINTING", slug: "bills-invoice-printing" },
      { name: "RELIGIOUS PRINTING & PUBLISHING", slug: "religious-printing-publishing" },
      { name: "EVENT PROGRAMMES", slug: "event-programmes" },
      { name: "NEWSLETTER PRINTING", slug: "newsletter-printing" },
    ],
  },
  {
    name: "BOOKS",
    slug: "books",
    subcategories: [
      { name: "PAPERBACK / SOFTCOVER / SOFTBACK BOOKS", slug: "paperback-books" },
      { name: "HARDBOUND / HARDBACK BOOKS", slug: "hardbound-books" },
      { name: "E-BOOK PRINTING", slug: "ebook-printing" },
      { name: "STUDY MATERIAL/GUIDE PRINTING", slug: "study-material-printing" },
      { name: "COMIC BOOK PRINTING", slug: "comic-book-printing" },
      { name: "SCHOOL BOOK PRINTING", slug: "school-book-printing" },
      { name: "TRAINING/INSTRUCTION MANUAL PRINTING", slug: "training-manual-printing" },
      { name: "FAMILY HISTORY BOOK PRINTING", slug: "family-history-book-printing" },
      { name: "BULK BOOK PRINTING", slug: "bulk-book-printing" },
      { name: "MAGAZINES", slug: "magazines" },
      { name: "PORTFOLIOS", slug: "portfolios" },
      { name: "CHILDREN BOOK", slug: "children-book" },
      { name: "GAMING RULEBOOK", slug: "gaming-rulebook" },
      { name: "YEARBOOK PRINT", slug: "yearbook-print" },
      { name: "PRESENTATIONS", slug: "presentations" },
      { name: "PROPOSAL PRINT", slug: "proposal-print" },
      { name: "INSTRUCTIONS PRINT", slug: "instructions-print" },
    ],
  },
  {
    name: "THESIS & DISSERTATION",
    slug: "thesis-dissertation",
    subcategories: [
      { name: "Thesis Print", slug: "thesis-print" },
      { name: "Dissertation Print", slug: "dissertation-print" },
      { name: "Final Major Projects", slug: "final-major-projects" },
      { name: "Thesis Dissertation Print", slug: "thesis-dissertation-print" },
    ],
  },
  {
    name: "CERTIFICATE & CARDS",
    slug: "certificate-cards",
    subcategories: [
      { name: "NOTECARDS", slug: "notecards" },
      { name: "CERTIFICATE PRINTING", slug: "certificate-printing" },
      { name: "FLASH CARD PRINTING", slug: "flash-card-printing" },
    ],
  },
  {
    name: "MARKETING MATERIALS",
    slug: "marketing-materials",
    subcategories: [
      { name: "BROCHURES", slug: "brochures" },
      { name: "TABLE AND TENTCARDS", slug: "table-tentcards" },
    ],
  },
  {
    name: "POSTERS",
    slug: "posters",
    subcategories: [
      { name: "POSTER PRINTING", slug: "poster-printing" },
      { name: "FRAMED POSTERS", slug: "framed-posters" },
      { name: "GRAPHICS AND ART PRINTS", slug: "graphics-art-prints" },
    ],
  },
  {
    name: "FLYERS OR LEAFLETS",
    slug: "flyers-leaflets",
    subcategories: [
      { name: "Flyers, Pamphlet or Leaflet - Black and White Printing", slug: "flyers-bw-printing" },
    ],
  },
  {
    name: "LETTERHEAD & STATIONERY",
    slug: "letterhead-stationery",
    subcategories: [
      { name: "Letterhead Printing", slug: "letterhead-printing" },
      { name: "Bill Books", slug: "bill-books" },
    ],
  },
  {
    name: "VISITING CARDS",
    slug: "visiting-cards",
    subcategories: [
      { name: "Business Cards", slug: "business-cards" },
    ],
  },
  {
    name: "BUSINESS STATIONERY",
    slug: "business-stationery",
    subcategories: [],
  },
  {
    name: "PERSONALISED GIFTS",
    slug: "personalised-gifts",
    subcategories: [
      { name: "Mug Printing", slug: "mug-printing" },
      { name: "Cushion Print", slug: "cushion-print" },
      { name: "Photo Calender", slug: "photo-calender" },
      { name: "Canvas Print", slug: "canvas-print" },
      { name: "Framed Photos", slug: "framed-photos" },
    ],
  },
  {
    name: "STICKERS AND LABELS",
    slug: "stickers-labels",
    subcategories: [],
  },
  {
    name: "DOCUMENT BINDING",
    slug: "document-binding",
    subcategories: [
      { name: "Corner Staple Binding", slug: "corner-staple-binding" },
      { name: "Staple Binding", slug: "staple-binding" },
      { name: "Center Staple Binding or Saddle Stitch Binding", slug: "center-staple-binding" },
      { name: "Spiral Binding", slug: "spiral-binding" },
      { name: "Wiro Binding", slug: "wiro-binding" },
      { name: "Soft Cover Binding", slug: "soft-cover-binding" },
      { name: "Glue / Tape Binding", slug: "glue-tape-binding" },
    ],
  },
];
