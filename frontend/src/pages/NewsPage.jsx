import React, { useState, useEffect } from 'react';
import AppBar from '../components/AppBar';
import axios from 'axios';
import '../styles/News.css'; 

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://tax-track-updated.onrender.com/news')
      .then(response => {
        console.log(response);
        setNewsArticles(response.data.news.articles);
        setLoading(false);
      }).catch(error => {
        if (error.response) {
          console.log('Error response:', error.response.data.message);
        } else if (error.request) {
          console.log('Error request:', error.request);
        } else {
          console.log('Error message:', error.message);
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <>
    <div className='main-container-news'>
    <AppBar />
      <div className='News'>
        <h1 className="heading font-bold text-3xl">Latest News</h1>
        <div className="news-container">
          {newsArticles.map((article, index) => (
            <div key={index} className="news-card">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <img src={article.urlToImage} alt={article.title} />
                <h3>{article.title}</h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default NewsPage;