import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps ={
        country :'in',
        pageSize: 12,
        category: 'general'
    }
    static propTypes ={
        country: PropTypes.string.isRequired,
        pageSize: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired
    }
    constructor(props){
        super(props);
        console.log("this is constructor");
        this.state= {
            articles: [],
            loading: false,
            page : 1,
            totalResults: 0,
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} | NewsApp`;
    };

    capitalizeFirstLetter = (string) => {
       return string[0].toUpperCase() + string.substring(1);
    };

    apiKey ='2c3693d7dffd425d903c3530f174eed4';
    //apiKey ='81091146852b4f5a80d1a6249a7bdd41'; //aa

    async updateNews(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true,
        })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData= await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    fetchMoreData = async()=>{
        this.setState({page: this.state.page+1});
        console.log(this.state.page)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });

    };

    componentDidMount(){
        this.updateNews();
    } 

    // handlePrev = async() =>{
    //     console.log("PREV")
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=81091146852b4f5a80d1a6249a7bdd41&page=${this.state.page-1}&pageSize=${this.props.pageSize }`;
    //     this.setState({
    //         loading: true
    //     })
    //     let data = await fetch(url);
    //     let parsedData= await data.json();
    //     console.log(parsedData);
    //     this.setState({
    //         articles: parsedData.articles,
    //         page: this.state.page-1,
    //         loading: false
    //     });
    //     this.setState({
    //         page: this.state.page-1,
    //     })
    //     this.updateNews();
    // } 

    // handleNext =async() =>{
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=81091146852b4f5a80d1a6249a7bdd41&page=${this.state.page+1}&pageSize=${this.props.pageSize }`;
    //     this.setState({
    //         loading: true
    //     })
    //     let data = await fetch(url);
    //     let parsedData= await data.json();
    //     console.log(parsedData);
    //     this.setState({
    //         articles: parsedData.articles,
    //         page: this.state.page+1,
    //         loading: false
    //     });
    //     this.setState({
    //         page: this.state.page+1,
    //     })
    //     this.updateNews();       
    // } 
  render() {
    return (
    <>
      
        <h2 className='my-3 text-center'>News-App - Top Headlines ({this.capitalizeFirstLetter(this.props.category)}) </h2> 
        
        <InfiniteScroll
          dataLength= {this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.totalResults}
          //loader={<Spinner/>}
        >                                                                            
        {this.state.loading && <Spinner/>}<div className='container my-3'>
        <div className='row'>  
        {this.state.articles.map((element)=>{
            return(
                <div className='col md-4  my-3' key={element.url}>
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
      {/* <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page <= 1} type="button" className="btn btn-sm btn-dark" onClick={this.handlePrev}>&larr; Prev</button>
        <button disabled={(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-sm btn-dark" onClick={this.handleNext}>Next &rarr;</button>
      </div> */}
    </>
    )
  }
}
