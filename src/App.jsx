import "./App.css"
import { useState, useEffect } from "react"

import Error from "./components/Error"
import Loader from "./components/Loader"
import Feed from "./components/Feed"

// const url = "https://ictransport.ru/rss-feed-682234369181.xml"
// const url = "https://ictransport.ru/rss-feed-827453696181.xml"
const url = "https://coddmac.store/codd_news/copy_xml/smi/potok_smi.xml"

function App() {
  const [news, setNews] = useState([])

  const [limited, setlimited] = useState(false)
  const [error, setError] = useState(false)
  const [errorText, seterrorText] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (window.limit) {
      setlimited(true)
    }

    const urlParams = new URLSearchParams(window.location.search)
    const newsId = urlParams.get("id")

    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(data, "application/xml")

        // Получаем массив элементов новостей
        let newsItems = Array.from(xmlDoc.getElementsByTagName("item"))
        newsItems = newsItems.filter((item) => {
          const turboAttribute = item.getAttribute("turbo")
          return turboAttribute === null || turboAttribute === "true"
        })

        let currentItem = newsItems.find((el) => {
          const elementId = Date.parse(el.querySelector("pubDate").textContent)
          return String(elementId) === newsId
        })

        // console.log(currentItem)

        if (!currentItem) throw new Error("didnt find")

        let title, link, pubDate, author, image, category, content
        if (currentItem.querySelector("title"))
          title = currentItem.querySelector("title").textContent
        if (currentItem.querySelector("link"))
          link = currentItem.querySelector("link").textContent
        if (currentItem.querySelector("pubDate"))
          pubDate = currentItem.querySelector("pubDate").textContent
        if (currentItem.querySelector("author"))
          author = currentItem.querySelector("author").textContent
        if (currentItem.querySelector("enclosure"))
          image = currentItem.querySelector("enclosure").attributes.url.textContent
        if (currentItem.querySelector("category"))
          category = currentItem.querySelector("category").textContent
        if (currentItem.getElementsByTagName("turbo:content")) {
          content = currentItem.getElementsByTagName("turbo:content")[0].textContent
        }

        currentItem = { title, link, pubDate, author, image, category, content }
        // console.log(currentItem)

        setNews(currentItem)
        setLoading(false)
      })
      .catch((error) => {
        // Обрабатываем ошибку при запросе
        console.log("Запрос не прошел. Ошибка: ", error)

        setError(true)
        seterrorText("Ошибка при получении данных")
      })
  }, [])
  if (error) return <Error errorText={errorText} />
  if (loading) return <Loader />

  // return <MySwiper />

  return <Feed news={news} limited={limited} />
}

export default App
