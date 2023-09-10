import './Header.scss';
import '../layout/cssall.css';
import { Button, Col, DropdownButton, Form, FormControl, Image, Row } from 'react-bootstrap';
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <>
            <div class="nav_footer">
                <div class="footer_index">
                    <div>
                        <Image class="img_logo" src="https://ou.edu.vn/wp-content/uploads/2016/08/Logo.png" rounded alt='Logo' />
                    </div>
                    <div class="text_index">
                        <p>
                            Sứ mạng: Trường Đại học Mở thành phố Hồ Chí Minh thực hiện giáo dục mở, tạo bình đẳng cho mọi người trong giáo dục đại học, góp phần xây dựng xã hội học tập, nâng cao tri thức và năng lực nghề nghiệp cho người học bằng các phương thức linh hoạt, thuận tiện và hiệu quả.
                        </p>

                        <p>
                            Tầm nhìn: Trường Đại học Mở thành phố Hồ Chí Minh phấn đấu trở thành Đại học thực hiện giáo dục mở, định hướng ứng dụng với chất lượng cao.
                        </p>
                    </div>
                </div>

                <p id="brrr"></p>

                <div>
                    <div class="text_footer">
                        <div>
                            <h5>THÔNG TIN CHUNG</h5>
                            <p>Địa chỉ: 35 – 37 Hồ Hảo Hớn, Phường Cô Giang, Quận 1, TP. HCM.</p>
                            <p>Điện thoại: 028-38364748.</p>
                            <p>Fax: 028-39207639 hoặc 028-39207640.</p>
                            <p>E-mail: ou@ou.edu.vn.</p>
                            <div class="img_footer">
                                <p>Kết nối với chúng tôi</p>

                                <div class="img_img">
                                    <div>
                                        <Image class="img_logo" src="https://i.rada.vn/data/image/2020/08/21/Facebook-2020-200.png" rounded alt='Logo' />
                                    </div>

                                    <div>
                                        <Image class="img_logo" src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" rounded alt='Logo' />
                                    </div>

                                    <div>
                                        <Image class="img_logo" src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" rounded alt='Logo' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="coso_footer">
                            <h5>CÁC CƠ SỞ TRỰC THUỘC</h5>
                            <p><FontAwesomeIcon icon={faLocationDot} />  Địa điểm 1: 97 Võ Văn Tần, P. Võ Thị Sáu, Q.3, TP. Hồ Chí Minh.</p>
                            <p><FontAwesomeIcon icon={faLocationDot} />  Địa điểm 2: 35-37 Hồ Hảo Hớn, P. Cô Giang, Q.1 , TP. Hồ Chí Minh.</p>
                            <p><FontAwesomeIcon icon={faLocationDot} />  Địa điểm 3: 371 Nguyễn Kiệm, P.3, Q. Gò Vấp, TP. Hồ Chí Minh.</p>
                            <p><FontAwesomeIcon icon={faLocationDot} />  Địa điểm 4: 02 Mai Thị Lựu, P. Đa Kao, Q.1, TP. Hồ Chí Minh.</p>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default Footer;