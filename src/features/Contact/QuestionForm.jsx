import React, { useContext, useEffect, useState } from 'react';
import { MyUserContext } from '../../App';
import axiosClient, { endpoints } from '../../api/axiosClient';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import QuestionItem from './QuestionItem';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestionForm = () => {
    const [user] = useContext(MyUserContext);
    const [content, setContentState] = useState();
    const [listQuestion, setListQuestion] = useState([]);
    const [listAnswer, setListAnswer] = useState([]);
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [dateTime, setDateTime] = useState('');
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        // const notify = () => toast("Wow so easy!");
        const loadQuesions = async () => {
            await axiosClient.get(endpoints['listQuestions'])
                .then(response => {
                    setListQuestion(response.data.questions);
                    // setDay(response.data.questions[0].date[2]);
                    // setMonth(response.data.questions[0].date[1]);
                    // setYear(response.data.questions[0].date[0]);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log('Error fetching post:', error);
                    setIsLoading(false);
                });
        }

        const loadDate = async () => {
            await axiosClient.get(endpoints['date'])
                .then(response => {
                    setDateTime(response.data);
                    console.log(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log('Error fetching post:', error);
                    setIsLoading(false);
                });
        }

        loadQuesions();
        loadDate();
    }, []);

    function timeDifference(targetDate) {

    }

    //thêm câu hỏi
    const addQuestion = (e) => {
        e.preventDefault();

        const currentDate = new Date();
        console.log("Ngay hien tai");
        console.log(currentDate);
        const formattedDateNow = new Date(format(currentDate, "MM-dd-yyyy"));
        console.log(formattedDateNow);

        console.log(">>>>>>>>>>>");
        console.log(dateTime);
        console.log(">>>>>>>>>>>Sau khi parse");
        console.log(format(new Date(dateTime), "dd-MM-yyyy"));
        const formattedDate = new Date(format(new Date(dateTime), "dd-MM-yyyy"));
        // const formattedDate = new Date(format(dateTime, "MM-dd-yyyy"));
        console.log(formattedDate);
        if (formattedDateNow.getTime() < formattedDate.getTime()) {
            // setShowForm(true);
            console.log("được đặt câu hỏi");
            console.log("data");
            const process = async () => {
                let { data } = await axiosClient.post(endpoints['addQuestion'], {
                    "content": content,
                    "liveId": 0,
                    "userId": user,
                    "answer": 0,
                    "style": true,
                })
                console.log(data);
                setListQuestion([data, ...listQuestion]);
                setContentState("");
            };
            process();
            toast.success('Gửi thành công!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            nav("/questionAndAnswer");
        }
        else {
            // setShowForm(false); //Không được đặt câu hỏi
            console.log("Không được đặt câu hỏi");
            toast.error('Ngoài chờ hành chính, bạn vui lòng quay lại sau. Câu hỏi của bạn chưa được gửi!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setContentState("");
        }
    }

    if (listQuestion === null)
        return (<div>Chưa có bình luận</div>)

    return (
        <>
            {isLoading ? <div>Loading ... </div> : <>
                {/* <div>{timeDifferenceString.currentDate}</div>
                <hr />
                <div>{timeDifferenceString.target}</div> */}
                <section className="mess wow animate__animated animate__fadeInUp">
                    <div className="help-heading">
                        <p>
                            Hãy cho chúng tôi biết thông tin và câu hỏi của bạn để chúng tôi có
                            thể hỗ trợ ngay nhé! 😉
                        </p>
                    </div>
                    <Form onSubmit={addQuestion}>
                        <div className="input-container" style={{ textAlign: 'left' }}>
                            {/* <input type="text" id="name" name="name" required="" /> */}
                            <div htmlFor="name">Tên của bạn: {user.username}</div>
                        </div>
                        <div className="input-container">
                            <textarea
                                placeholder="Nội dung"
                                id="message"
                                name="message"
                                rows={3}
                                required=""
                                value={content}
                                onChange={e => setContentState(e.target.value)}
                            />
                        </div>

                        <div className="input-container">
                            <button id="submit-btn" type='submit'>
                                Gửi
                            </button>
                        </div>
                    </Form>
                </section>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark" />
            </>}
        </>
    );
};

export default QuestionForm;