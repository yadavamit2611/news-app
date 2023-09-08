import { NewsArticle } from "@/models/NewsArticles"
import Image from "next/image";
import Link from "next/link";
import {Card} from "react-bootstrap";
import placeHolderImage from "@/assets/images/madaruchicha.jpg";
import styles from "@/styles/NewsArticleEntry.module.css"

interface NewsArticleEntryProps {
    article : NewsArticle,
}


const NewsArticleEntry = ({article: {title, description, url, urlToImage}} : NewsArticleEntryProps) => {
  const validImageUrl = (urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")) ? urlToImage : undefined;
    return (
    <Link href={url}>
        <Card className="h-100">
        <Image className={`card-img-top ${styles.image}`} src={validImageUrl || placeHolderImage} width={500} height={200} alt={title}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
        </Card.Body>
        </Card>
    </Link>
  )
}

export default NewsArticleEntry