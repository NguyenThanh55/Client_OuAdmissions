import React, { useContext, useState } from 'react';
import { Button, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { MyUserContext } from '../../App';

const CommentForm = ({
    handleSubmit,
    submitLabel,
    reply,
    commentId = '',
    handleCancelButton = false,
    initialText = '',
    handleCancel,
}) => {
    const [user] = useContext(MyUserContext);
    const [content, setContent] = useState(initialText);
    console.log(commentId);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(commentId);
        if (commentId === '')
            handleSubmit(content, reply);
        if (commentId !== '')
            handleSubmit(content, commentId, reply);
        setContent("");
    }
    return (
        <>
            <Form onSubmit={onSubmit} >
                <ul className='form-comment'>
                    <li>
                        <Row>
                            <Image style={{ width: "100%" }} src={user.avatar} roundedCircle alt='Logo' />
                        </Row>
                    </li>
                    <li>
                        <InputGroup>
                            <Form.Control
                                as="textarea"
                                aria-label="With textarea"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder='Nhập bình luận ... ' />
                        </InputGroup>
                    </li>
                    <li>
                        <Button
                            variant="primary"
                            type="submit">
                            {submitLabel}
                        </Button>
                        {handleCancelButton && (
                            <Button
                                variant="primary"
                                type='button'
                                // className='comment-form-button comment-form-cancel-button'
                                onClick={handleCancel} >
                                Hủy
                            </Button>
                        )}
                    </li>
                </ul>
            </Form>
        </>
    );
};

export default CommentForm;