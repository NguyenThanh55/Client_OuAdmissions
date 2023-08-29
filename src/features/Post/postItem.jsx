import React, { useEffect, useState }  from 'react';
import { useParams } from 'react-router-dom';
import './post.scss';
import axiosClient, { endpoints } from '../../api/axiosClient';
import Container from 'react-bootstrap/Container';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { FacebookProvider, Comments ,Like  } from 'react-facebook';

function PostItem({ postId }) {
    const [post, setPost] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        
        axiosClient.get(`${endpoints['postInfo']} + ${id}`)
           .then(response => {
                setPost(response.data);
            })
            .catch(error => {                
                console.log(error);
            });
    }, [id]);

    



    if (!post) {
        return <div>Loading...{postId}</div>;

    }
    else {
        
    }

    

    let url = "http://192.168.1.4:3000/post_info/"+id;
    let appId = 6836544049690538;
    

    return (
        <Container>
            <div > 
                <h2 className="text-center m-5">{post.title}</h2>
                <div dangerouslySetInnerHTML={{__html: post.content}} />
                
            </div>
            
            <FacebookProvider appId={appId} width="100%">
                <Comments href="https://hoangvbm2808.github.io/webschool/" width="100%" />
                
            </FacebookProvider>
            
            <div className="m-5">
                <FacebookShareButton url={url} appId={appId}>
                    <FacebookIcon size={50} round/>
                </FacebookShareButton>
            </div>
        </Container>
            
        
    );
}

export default PostItem;