import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import {FormEvent, useState} from "react"
import {Form, Button,Spinner,Alert } from "react-bootstrap"

const SearchNewsPage = () => {
    const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null);
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [searchResultsLoadingisError, setSearchResultsLoadingisError] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const searchQuery = formData.get("searchQuery")?.toString().trim();
        if(searchQuery){
            try {
                setSearchResults(null);
                setSearchResultsLoadingisError(false);
                setSearchResultsLoading(true);
                const response = await fetch("/api/search-news?q="+searchQuery);
                console.log(response);
                const articles: NewsArticle[] = await response.json();
                console.log(articles);
                setSearchResults(articles);
            } catch (error) {
                console.error(error);
                setSearchResultsLoadingisError(true);
            }finally{
                setSearchResultsLoading(false);
            }
        }
    }

    return (<main>
        <h1>Search News</h1>
        {/* <Alert>This page uses <strong>client side data fetching</ strong> to show fresh data for every search <strong>API routes</strong></Alert> */}
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="search-input">
                <Form.Label>Search Query</Form.Label>
                <Form.Control name="searchQuery" placeholder="E.g politics, sports"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Button type="submit" className="mb-3" disabled={searchResultsLoading}>Search</Button>
            </Form.Group>
        </Form>
        <div className="d-flex flex-column align-items-center">
            {searchResultsLoading && <Spinner animation="border"/>}
            {searchResultsLoadingisError && <p>Something went wrong. Please try again later..</p>}
            {searchResults?.length === 0 && <p>Nothing found. Try a different query</p>}
            {searchResults && <NewsArticlesGrid articles={searchResults}/>}
        </div>
    </main>)
}
export default SearchNewsPage;