import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/footer.css';
const FooterUser = () => {
  const handleActions = (categotyid) => {
    localStorage.setItem('categoryids', categotyid);
    window.location.href = '/product-by-category';
  };
  const handleActionslv2 = (categotylv2id) => {
    localStorage.setItem('categorylv2ids', categotylv2id);
    window.location.href = '/product-by-categorylv2';
  };
  return (
    <div>
   <div>
<footer class="bg-body-tertiary text-center footer-container" >
  <div class="container p-4" >
    <section class="mb-4">
      <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="https://www.facebook.com/ninhngoctuan1412/" role="button"><i class="fab fa-facebook-f"></i></a>

      <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRwQnXMzkNbmpSmZHNfRCGVLLMxsMkKpgRMBDrwSMSLpDDFXnjJSdQdFdmNkVgfLXcwkSSvb" role="button"><i class="fab fa-google"></i></a>

      <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="https://www.instagram.com/jin._.art18/" role="button"><i class="fab fa-instagram"></i></a>

      <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="https://github.com/nguyentraiCNT2" role="button" ><i class="fab fa-github"></i></a>
    </section>

    
    <section class="mb-4">
    
    </section>

    <section class="">
      <div class="row">
        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">Danh Mục</h5>

          <ul class="list-unstyled mb-0">
            <li>
              <a class="text-body" onClick={() => handleActions(1)} href="#!">Điện thoại</a>
            </li>
            <li>
              <a class="text-body" onClick={() => handleActions(2)} href="#!">LapTop</a>
            </li>
            <li>
              <a class="text-body" onClick={() => handleActions(3)} href="#!">Phụ kiện</a>
            </li>
            
          </ul>
        </div>

        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">Điện thoại</h5>

          <ul class="list-unstyled mb-0">
            <li>
              <a class="text-body"  onClick={() => handleActionslv2(1)} href="#!">Iphone</a>
            </li>
            <li>
              <a class="text-body"  onClick={() => handleActionslv2(2)} href="#!">Sam Sung</a>
            </li>
            <li>
              <a class="text-body"  onClick={() => handleActionslv2(3)} href="#!">XiaoMi</a>
            </li>
            <li>
              <a class="text-body"  onClick={() => handleActionslv2(4)} href="#!">Realme</a>
            </li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">LAPTOP</h5>

          <ul class="list-unstyled mb-0">
            <li>
              <a class="text-body"  onClick={() => handleActionslv2(6)} href="#!">ASUS</a>
            </li>
            <li>
              <a class="text-body"  onClick={() => handleActionslv2(5)} href="#!">HP</a>
            </li>
            <li>
              <a class="text-body"  onClick={() => handleActionslv2(7)} href="#!">DELL</a>
            </li>
         
          </ul>
        </div>

        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">Phụ kiện</h5>

          <ul class="list-unstyled mb-0">
            <li>
              <a class="text-body"  onClick={() => handleActionslv2(8)} href="#!">Bàn Phím</a>
            </li>
            <li>
              <a class="text-body"  onClick={() => handleActionslv2(9)} href="#!">Tai Nghe</a>
            </li>
            <li>
              <a class="text-body"  onClick={() => handleActionslv2(10)} href="#!">Chuột</a>
            </li>
           
          </ul>
        </div>

      </div>

    </section>

  </div>



  <div class="text-center p-3"  style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
    © 2023 Copyright:
    <a class="text-reset fw-bold" href="/index">GuardianNest.com</a>
  </div>

</footer>
   </div>
  </div>
  );
};

export default FooterUser;
