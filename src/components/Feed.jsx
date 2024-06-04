import modifyContent from "../utils/modifyContent"

const Feed = ({ news, limited }) => {
  return (
    <div className={`wrapper ${limited ? "limited" : ""}`}>
      <nav>
        <a
          className='linkToNews'
          href={`https://gucodd.ru/${
            limited ? "news_vision" : "news"
          }`}>
          <svg
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M11.25 14.625L5.625 9L11.25 3.375'
              stroke='#62A744'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <p>К новостям</p>
        </a>
      </nav>
      <div className='feed'>
        {modifyContent(news).components.map((particle) => particle)}
      </div>
    </div>
  )
}

export default Feed
