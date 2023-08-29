import React from 'react';
import './Contact.scss';
const Contact = () => {
    return (
        <>
            <section className="banner">
                <div className="container">
                    <div className="banner-text wow animate__animated animate__fadeInUp">
                        <h1>LIÊN HỆ VỚI CHÚNG TÔI</h1>
                        <p>
                            Trường Đại học Mở là trường đại học hàng đầu tại Việt Nam với nhiều
                            chương trình đào tạo và hoạt động nghiên cứu tích cực.
                        </p>
                    </div>
                </div>
            </section>

            <div className="main-container__bg">
                <div className="main-container">
                    <main className="container">
                        <section className="mess wow animate__animated animate__fadeInUp">
                            <div className="help-heading">
                                <p>
                                    Hãy cho chúng tôi biết thông tin và câu hỏi của bạn để chúng tôi có
                                    thể hỗ trợ ngay nhé! 😉
                                </p>
                            </div>
                            <div className="input-container">
                                <input type="text" id="name" name="name" required="" />
                                <label htmlFor="name">Tên của bạn:</label>
                            </div>
                            <div className="input-container">
                                <input type="email" id="email" name="email" required="" />
                                <label htmlFor="email">Email của bạn:</label>
                            </div>
                            <div className="input-container">
                                <textarea
                                    placeholder="Nội dung"
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required=""
                                    defaultValue={""}
                                />
                            </div>
                            <div className="input-container">
                                <button id="submit-btn" onclick="guithu()">
                                    Gửi
                                </button>
                            </div>
                            <div className="success-message" style={{ display: "none" }}>
                                <p>Thư của bạn đã được gửi đến trường thành công!</p>
                                <button id="write-again" onclick="guilaithu()">
                                    Viết thư mới
                                </button>
                            </div>
                        </section>
                        <section className="container-question wow animate__animated animate__fadeInUp">
                            <div className="section-ques">
                                <h2>Các câu hỏi thường gặp</h2>
                                <div id="napcauhoi" className="ques-items">
                                    <div className="ques-item">
                                        <div className="ques">
                                            Hồ sơ sét tuyển vào trường cần những gì ?
                                            <span className="arrow-circle">
                                                <i className="fa-solid fa-plus" />
                                            </span>
                                        </div>
                                        <div className="ans">
                                            Phiếu đăng ký xét tuyển: Đây là một biểu mẫu đơn giản cung cấp
                                            thông tin cơ bản về thí sinh như họ tên, địa chỉ, số điện thoại,
                                            thông tin về trường học đã tốt nghiệp, chuyên ngành mong muốn
                                            học, v.v.
                                        </div>
                                    </div>
                                    <div className="ques-item">
                                        <div className="ques">
                                            Tôi nên đăng ký những môn học nào vào học kỳ đầu tiên?
                                            <span className="arrow-circle">
                                                <i className="fa-solid fa-plus" />
                                            </span>
                                        </div>
                                        <div className="ans">
                                            Nên đăng ký những môn học cơ bản, nhưng đừng quá tải mình. Nếu
                                            bạn chưa chắc chắn về chuyên ngành của mình, hãy đăng ký các môn
                                            học tổng quát để có cái nhìn tổng quan về các lĩnh vực khác
                                            nhau.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            <div className="main-container__bg">
                <section className="location">
                    {/* ADDRESS + MAP */}
                    <div className="container-address">
                        <div className="it-major-header wow animate__animated animate__fadeInUp">
                            <h2>Chi Nhánh Liên Hệ</h2>
                            <p>
                                Trường có hai cơ sở chính tại các khu vực khác nhau của thành phố được
                                trang bị đầy đủ các công nghệ hiện đại.
                            </p>
                        </div>
                        <div className="address-items flex wow animate__animated animate__fadeInUp">
                            <div className="address-item wow animate__animated animate__fadeInUp">
                                <div className="flex" style={{ alignItems: "center" }}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/oaflahpk.json"
                                        trigger="loop"
                                        delay={1500}
                                        colors="primary:#4bb3fd"
                                        style={{ width: 50, height: 50 }}
                                    ></lord-icon>
                                    <h3>Cơ sở Thành phố Hồ Chí Minh</h3>
                                </div>
                                <div className="address-info">
                                    <ul>
                                        <li>
                                            Địa chỉ: Tòa nhà Golden Park, Số 2 Nguyễn Kiệm, quận 1, Thành
                                            phố Hồ Chí Minh.
                                        </li>
                                        <li>Điện thoại: 024.7300.2266</li>
                                        <li>Hotline: 0981.558.080 | 0971.274.545</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="address-item wow animate__animated animate__fadeInUp">
                                <div className="flex" style={{ alignItems: "center" }}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/oaflahpk.json"
                                        trigger="loop"
                                        delay={1500}
                                        colors="primary:#4bb3fd"
                                        style={{ width: 50, height: 50 }}
                                    ></lord-icon>
                                    <h3>Cơ sở Hà Nội</h3>
                                </div>
                                <div className="address-info">
                                    <ul>
                                        <li>
                                            Địa chỉ: Tòa nhà Golden Park, Số 2 Nguyễn Kiệm, Cầu Giấy, Thành
                                            phố Hà Nội.
                                        </li>
                                        <li>Điện thoại: 024.7300.2266</li>
                                        <li>Hotline: 0981.558.080 | 0971.274.545</li>
                                    </ul>
                                    <div class="map">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9306899559792!2d106.67599247460375!3d10.816616158451994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e195f816b7%3A0xfb5c0101490d8870!2zMzcxIE5ndXnhu4VuIEtp4buHbSwgUGjGsOG7nW5nIDMsIEfDsiBW4bqlcCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1690791562862!5m2!1svi!2s"
                                            width="450" height="150" style={{ border: 0 }} allowfullscreen="" loading="lazy"
                                            referrerpolicy="no-referrer-when-downgrade">
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >

        </>
    );
};

export default Contact;