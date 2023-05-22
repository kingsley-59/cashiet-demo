import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

const TermsOfSerive = () => {
    const [content, setContent] = useState('')

    useEffect(() => {
        fetch('terms-of-service.md')
        .then(res => res.text())
        .then(data => setContent(data))
        .catch(error => {
            alert('something went wrong')
            console.log(error?.message)
        })
    }, [content]);

    return (
        <div className=" container text-start block mx-auto mt-5 ">
            <h2>Terms of Service</h2>
            <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
        </div>
    )
}

export default TermsOfSerive;