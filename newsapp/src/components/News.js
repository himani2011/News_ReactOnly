import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {

    static defaultProps={
        country:'in',
        pageSize:10,
        category:'general',
    }

    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }

    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        }
    }

    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
    }
    async componentDidMount(){
        await this.updateNews();
    }

    async handlePrevClick() {
        this.setState({page:this.state.page-1});
        await this.updateNews();
    }
    async handleNextClick(){
    console.log("next")
    this.setState({page:this.state.page+1});
    await this.updateNews();
    }

  render() {
    return (
        <div>
            <div className='container my-3'>
            <h1 className='text-center'>Top headlines today!!</h1>
            {this.state.loading && <Spinner/>}
                <div className='row'>
                {
                    !this.state.loading && this.state.articles.map((element)=>{
                        return <div className='col-md-4' key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0,45):""} 
                        description={element.description?element.description.slice(0,88):""} 
                        imageUrl={element.urlToImage?element.urlToImage:"https://cdn.mos.cms.futurecdn.net/acHxmYzQPrsdvfrQmN8RAL-1200-80.jpg"}
                        newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt?element.publishedAt:"Unknown"}
                        source={element.source.name}/>
                    </div>
                    })
                }
                </div>
            </div>
            <div className='container d-flex justify-content-between'>
            <button type="button" className="btn btn-dark" disabled={this.state.page<=1} onClick={this.handlePrevClick}>&laquo; Previous</button>
            <button type="button" className="btn btn-dark" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick}>Next &raquo;</button>
            </div>
        </div>
    )
  }
}
