import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props) {
    const [ articles,setArticles] =useState([]);
    const [ loading,setLoading] =useState(false);
    const [ totalResults,settotalResults] =useState(0);
    const [ page,setPage] =useState(1);

   const capitalizeFirstLetter = (string) => {
       return string[0].toUpperCase() + string.substring(1);
    };
    

    let apiKey ='2c3693d7dffd425d903c3530f174eed4';
    //apiKey ='81091146852b4f5a80d1a6249a7bdd41'; //aa

    
     const fetchMoreData= async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
    };
    
    const updateNews = async()=>{
        props.setProgress(10);        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        console.log("Async func = " + page);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData= await data.json();
        props.setProgress(70);
        console.log(parsedData);
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} | NewsApp`;
        updateNews();
        //eslint-disable-next-line
    }, [])
     

    // handlePrev = async() =>{
    //     console.log("PREV")
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=81091146852b4f5a80d1a6249a7bdd41&page=${page-1}&pageSize=${props.pageSize }`;
    //   
    //     setLoading(true);
    //     let data = await fetch(url);
    //     let parsedData= await data.json();
    //     console.log(parsedData);
            // setArticles(parsedData.articles);
            // setPage(page -1);
            // setLoading(false);
    //     updateNews();
    // } 

    // const handleNext =async() =>{
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=81091146852b4f5a80d1a6249a7bdd41&page=${state.page+1}&pageSize=${props.pageSize }`;
    //     setLoading(true);
    //     let data = await fetch(url);
    //     let parsedData= await data.json();
    //     console.log(parsedData);
    // setArticles(parsedData.articles);
            // setPage(page +1);
            // setLoading(false);
    //     updateNews();       
    // } 

    return (
    <>
        <h2 className='text-center' style={{marginTop:'50px'}}>News-App - Top Headlines ({capitalizeFirstLetter(props.category)}) </h2> 
        <InfiniteScroll
          dataLength= {articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          //loader={<Spinner/>}
        >                                                                            
        {loading && <Spinner/>}<div className='container my-3'>
        <div className='row'>  
        {articles.map((element, index)=>{
            return(
                <div className='col md-4  my-3' key={index}>
                    <NewsItem title={element.title?element.title.slice(0,45):"..................."} 
                    description ={element.description?element.description.slice(0,90):".............."} 
                    imgUrl={element.urlToImage?element.urlToImage:"https://content.api.news/v3/images/bin/f7f325e09ce6fec78b855f77945ee673"} 
                    newsUrl= {element.url}
                    date ={element.publishedAt}
                    author ={element.author}
                    source ={element.source.name}/>
                </div>
            )
        })}            
        </div>
      </div>
      </InfiniteScroll>
      {/* prev and next Button */}
      {/* <div className='container d-flex justify-content-between'>
        <button disabled={page <= 1} type="button" className="btn btn-sm btn-dark" onClick={handlePrev}>&larr; Prev</button>
        <button disabled={(page+1>Math.ceil(totalResults/props.pageSize))} type="button" className="btn btn-sm btn-dark" onClick={.handleNext}>Next &rarr;</button>
      </div> */}
    </>
    )
}
News.defaultProps ={
    country :'in',
    pageSize: 12,
    category: 'general'
}
News.propTypes ={
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired
}
