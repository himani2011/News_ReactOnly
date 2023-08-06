import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {

    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState([false]);
    const [page,setPage] = useState(1);
    const [totalResults,setTotalResults] = useState(0);

    
    const capitalize =(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews=async()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(()=>{
        document.title = `${capitalize(props.category)} News`
        updateNews();
        // eslint-disable-next-line
    },[])

    // handlePrevClick= async() => {
    //     await this.setState({page:this.state.page-1});
    //     await this.updateNews();
    // }
    // handleNextClick= async() =>{
    // console.log("next")
    // await this.setState({page:this.state.page+1});
    // await this.updateNews();
    // }
    const fetchMoreData = async() => {
       const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
       setPage(page+1) 
       setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        
        
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false); 
       
      };


    return (
        <div>
            <>
            <h1 className='text-center' style={{margin:'35px 0px',marginTop:'90px'}}>Top {capitalize(props.category)} headlines!!</h1>
            {loading && <Spinner/>}
            <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
            >
            <div className='container'>
                <div className='row'>
                {
                    articles.map((element)=>{
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
            </InfiniteScroll>
            </>

            {/* <div className='container d-flex justify-content-between'>
            <button type="button" className="btn btn-dark" disabled={this.state.page<=1} onClick={this.handlePrevClick}>&laquo; Previous</button>
            <button type="button" className="btn btn-dark" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} onClick={this.handleNextClick}>Next &raquo;</button>
            </div> */}
        </div>
    )
  
}

News.defaultProps={
    country:'in',
    pageSize:0,
    category:'general',
}

News.propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
}

export default News