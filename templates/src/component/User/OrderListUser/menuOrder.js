// Import các thư viện cần thiết
import React,{useState} from 'react';

const MenuOrder = ({ match, history }) => {

    return (
        <div>
            <div className="col-sm-12 ">
                <div className="dataTables_length" id="dataTable_length" >
                    <a href="/order-list-user" className="menu-order-item" style={{fontFamily:'Poppins-Regular', fontSize:'18px', fontWeight:'700'}}>Tất cả</a>
                    <a href="/order-status-user-1" className="menu-order-item"  style={{fontFamily:'Poppins-Regular', fontSize:'18px', fontWeight:'700'}}>Đang lấy hàng</a>
                    <a href="/order-status-user-2" className="menu-order-item"  style={{fontFamily:'Poppins-Regular', fontSize:'18px', fontWeight:'700'}}>Đang giao</a>
                    <a href="/order-status-user-3" className="menu-order-item"  style={{fontFamily:'Poppins-Regular', fontSize:'18px', fontWeight:'700'}}>Đã giao</a>
                    <a href="/order-cancel-user" className="menu-order-item"  style={{fontFamily:'Poppins-Regular', fontSize:'18px', fontWeight:'700'}}>Đã hủy</a>

                </div>
            </div>
        </div>
    );
};

export default MenuOrder;
