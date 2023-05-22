import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

const PrivacyPolicy = () => {
    const [content, setContent] = useState('')

    useEffect(() => {
        fetch('privacy-policy.md')
        .then(res => res.text())
        .then(data => setContent(data))
        .catch(error => {
            alert('something went wrong')
            console.log(error?.message)
        })
    }, [content]);

    return (
        <div className=" container text-start block mx-auto mt-5 ">
            <h2>Privacy Policy</h2>
            <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
        </div>
    )
}

export default PrivacyPolicy;