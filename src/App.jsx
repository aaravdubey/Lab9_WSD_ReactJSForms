import { useState } from 'react';
import './App.css'
import Header from './components/Header';
import booksData from '../src/data/books.json';

function App() {
  const [books, setBooks] = useState(booksData);
  const [searchInp, setSearchInp] = useState('');

  const [name, setName] = useState('');
  const [isNameErr, setIsNameErr] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailErr, setIsEmailErr] = useState(false);
  const [bName, setBName] = useState('');
  const [isBNameErr, setIsBNameErr] = useState(false);
  const [review, setReview] = useState('');
  const [isReviewErr, setIsReviewErr] = useState(false);

  const [reviewList, setReviewList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (name.length < 3) setIsNameErr(true);
    else setIsNameErr(false);
    console.log(name.length < 3);

    if (!new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$').test(email)) setIsEmailErr(true);
    else setIsEmailErr(false);
    console.log(!new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$').test(email));

    let isValidBook;
    isValidBook = books.find((book) => book.title == bName);
    if (isValidBook == undefined) setIsBNameErr(true);
    else setIsBNameErr(false);
    console.log(isValidBook == undefined);

    if (review.length == 0) setIsReviewErr(true);
    else setIsReviewErr(false);
    console.log(review.length == 0);

    if (!((name.length < 3) || (!new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$').test(email)) || (isValidBook == undefined) || (review.length == 0))) {
      setReviewList(prev => [...prev, {
        name,
        email,
        book: bName,
        review
      }]);

      setName('');
      setBName('');
      setEmail('');
      setReview('');
    }

  }

  function handleSearchChange(e) {
    setSearchInp(e.target.value);
    let filteredBooks = books.filter((book) => {
      if (book.title.toLowerCase().includes(searchInp.toLowerCase())) return book;
    })
    // console.log(filteredBooks);
    if (e.target.value == '') setBooks(booksData);
    else setBooks(filteredBooks);
  }

  return (
    <>
      <Header handleSearchChange={handleSearchChange} />

      <div className="container d-flex flex-wrap justify-content-center gap-4 mt-6 mb-5">
        {books.length > 0 ? books.map((book, i) =>
          <div className="card shadow " style={{ width: '18rem' }} key={i}>
            <h5 className="card-header bg-info text-white">{book.title}</h5>
            <div className="card-body">
              {/* <h5 className="card-title mb-3">{book.title}</h5> */}
              <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
              <p className="card-text">Genre: {book.genre}</p>
              <p className="card-text">Publication Year: {book.publication_year}</p>
              <p className="card-text">Rating: {book.rating}</p>
            </div>
          </div>
        )
          : <>No Such Books Found.</>}
      </div>

      <hr />

      <section>
        {/* <h2>Book Review</h2> */}
        <form className="p-5" onSubmit={handleSubmit}>
          <h1 className="h3 mb-5 fw-normal fw-bold">Write Book Reviews</h1>
          <div className="input-div mb-1">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" aria-describedby="nameError" onChange={(e) => setName(e.target.value)} value={name} required />
            <div id="nameError" className={isNameErr ? "form-text error-text display-error" : "form-text error-text"}>Minimum 3 characters required.</div>
          </div>

          <div className="input-div mb-1">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailError" onChange={(e) => setEmail(e.target.value)} value={email} required />
            <div id="emailError" className={isEmailErr ? "form-text error-text display-error" : "form-text error-text"}>Please enter a valid email.</div>
          </div>

          <div className="input-div mb-1">
            <label htmlFor="email" className="form-label">Book Name</label>
            <input type="text" className="form-control" id="email" aria-describedby="emailError" onChange={(e) => setBName(e.target.value)} value={bName} required />
            <div id="bookerror" className={isBNameErr ? "form-text error-text display-error" : "form-text error-text"}>Please enter a valid book name from above.</div>
          </div>

          <div className="input-div mb-3">
            <label htmlFor="password" className="form-label">Review</label>
            <textarea type="password" className="form-control" id="password" aria-describedby="passError" onChange={(e) => setReview(e.target.value)} value={review} required />
            <div id="reviewerror" className={isReviewErr ? "form-text error-text display-error" : "form-text error-text"}>Review cannot be empty.</div>
          </div>

          <button type="submit" className="btn btn-primary mt-3 btn-info text-white fw-bold shadow">Submit</button>
        </form>
      </section>

      <hr />

      <section className="p-5">
        <h1 className="h3 mb-5 fw-normal fw-bold">Book Reviews</h1>

        {reviewList.length > 0 ? reviewList.map((review, i) => 
        <div className="card border-info   mb-3 shadow " key={i}>
          <h5 className="card-header text-info ">Book: {review.book}</h5>
          <div className="card-body d-flex justify-content-between ">
            <h5 className="card-title">{review.review}</h5>
            <p className="card-text"><small className=" text-secondary ">~{review.name} ({review.email})</small></p>
            {/* <p className="card-text"> </p> */}
          </div>
        </div>) : <>No book reviews.</>}
      </section>
    </>
  )
}

export default App
