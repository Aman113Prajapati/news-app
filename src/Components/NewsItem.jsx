import React from 'react'

export default function NewsItem( { source, description, date, pic, url } ) {

  return (
    <div className="col-md-4 mb-3">
      <div className="card">

        <img src={pic || "https://via.placeholder.com/300"} className="card-img-top" alt="news" />

        <div className="card-body">

          <h5 className="card-title">
            {description?.slice( 0, 50 )}
          </h5>

          <div className="card-source">
            <p>{source}</p>
            <p>{new Date( date ).toDateString()}</p>
          </div>

          <p className="card-text">
            {description?.slice( 0, 100 )}
          </p>

          <a href={url} target="_blank" rel="noreferrer" className="btn btn-custom">
            Read More
          </a>

        </div>

      </div>
    </div>
  )
}
