import React, { Component } from 'react'

export default class NewsItem  extends Component {
  render() {
   let {title, description,imgUrl,newsUrl, author, date,source} = this.props;
    return (
        <>
        <div className="card " style={{width: '18rem'}}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-info" style={{zIndex:'1' , left:'85%'}}>
                   {source}
       </span>
        <img src={imgUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}. . .</h5>
          <p className="card-text">{description}. . .</p>
          <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} className="btn-sm btn btn-dark" target='_blank' rel='noreferrer'>Read More</a>
        </div>
      </div>
      </>
    )
  }
}
