import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;

    return (
      <div>
        <div className='my-3'>
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'80%',zIndex:1}}>
                  {source}
                </span>
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toTimeString()}</small></p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
                </div>
        </div>
        </div>
      </div>
    )
  }
}
