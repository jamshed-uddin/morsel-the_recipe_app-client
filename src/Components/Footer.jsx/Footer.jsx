import CallMadeIcon from "@mui/icons-material/CallMade";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-2 lg:px-[6rem] pt-7 text-colorTwo  mt-4 bg-[#f3f2ef]">
      <div className="md:flex justify-between gap-12 my-2">
        <div className="md:w-1/3">
          <h2 className="text-[2.6rem] leading-4 font-bold text-colorOne ">
            Morsel
          </h2>
          <div className="mt-5 relative">
            <p className="text-lg">Get fresh recipes, cooking tips and more</p>
            <input type="email" placeholder="Your email" />
            <button className="text-colorOne absolute right-1 bottom-[0.35rem] p-1">
              <CallMadeIcon sx={{ fontSize: 35 }} />
            </button>
          </div>
          {/* social links */}
          <div className="flex gap-6 mt-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 16 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2325 0.322724L11.5612 0.316833C7.43656 0.316833 4.77107 3.05155 4.77107 7.28424V10.4967H1.07972C0.760745 10.4967 0.502441 10.7553 0.502441 11.0743V15.7287C0.502441 16.0477 0.761039 16.306 1.07972 16.306H4.77107V28.0507C4.77107 28.3696 5.02937 28.628 5.34834 28.628H10.1645C10.4835 28.628 10.7418 28.3694 10.7418 28.0507V16.306H15.0578C15.3768 16.306 15.6351 16.0477 15.6351 15.7287L15.6369 11.0743C15.6369 10.9211 15.5759 10.7744 15.4678 10.666C15.3597 10.5576 15.2125 10.4967 15.0593 10.4967H10.7418V7.77345C10.7418 6.46456 11.0537 5.8001 12.7587 5.8001L15.2319 5.79922C15.5506 5.79922 15.8089 5.54062 15.8089 5.22194V0.900003C15.8089 0.581616 15.5509 0.323313 15.2325 0.322724Z"
                fill="#233748"
              ></path>
            </svg>

            <svg
              width="30"
              height="30"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M9.74865 0.850647H3.63152C1.64064 0.850647 0.0209961 2.4703 0.0209961 4.46117V10.5784C0.0209961 12.5692 1.64064 14.1888 3.63152 14.1888H9.74876C11.7395 14.1888 13.3592 12.5692 13.3592 10.5784V4.46117C13.3592 2.4703 11.7395 0.850647 9.74865 0.850647V0.850647ZM6.69009 11.1668C4.67906 11.1668 3.04303 9.53076 3.04303 7.51974C3.04303 5.50871 4.67906 3.87268 6.69009 3.87268C8.70111 3.87268 10.3371 5.50871 10.3371 7.51974C10.3371 9.53076 8.70111 11.1668 6.69009 11.1668ZM10.4244 4.73278C9.83006 4.73278 9.34669 4.2494 9.34669 3.65511C9.34669 3.06082 9.83006 2.57735 10.4244 2.57735C11.0186 2.57735 11.5021 3.06082 11.5021 3.65511C11.5021 4.2494 11.0186 4.73278 10.4244 4.73278Z"
                  fill="#233748"
                ></path>
                <path
                  d="M6.68982 4.65472C5.11007 4.65472 3.82471 5.93998 3.82471 7.51984C3.82471 9.0996 5.11007 10.385 6.68982 10.385C8.26968 10.385 9.55494 9.0996 9.55494 7.51984C9.55494 5.93998 8.26968 4.65472 6.68982 4.65472Z"
                  fill="#233748"
                ></path>
                <path
                  d="M10.4241 3.35944C10.2611 3.35944 10.1284 3.49213 10.1284 3.65516C10.1284 3.81818 10.2611 3.95088 10.4241 3.95088C10.5873 3.95088 10.72 3.81828 10.72 3.65516C10.72 3.49203 10.5873 3.35944 10.4241 3.35944Z"
                  fill="#233748"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                    x="0.0209961"
                    y="0.850647"
                    width="13.3382"
                    height="13.3382"
                    fill="white"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
            <svg
              width="30"
              height="30"
              viewBox="0 0 31 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.6285 3.70048C29.5139 3.58588 29.3777 3.4933 29.2292 3.42521C29.3287 3.21421 29.4181 2.99894 29.497 2.7794C29.7044 2.24324 29.5961 1.69158 29.2049 1.30036C28.8056 0.901282 28.18 0.792298 27.6724 1.03049C26.5875 1.49541 25.5419 1.93517 24.6741 2.2192C23.6625 1.6763 21.9897 0.90645 20.6413 0.90645H20.6291C18.7809 0.932516 17.0486 1.69608 15.7514 3.05646C14.6611 4.19955 13.9856 5.6523 13.8038 7.21514C9.73235 6.32035 7.3774 5.01255 4.74831 2.25627L4.41575 1.92326C4.18497 1.69226 3.8551 1.58574 3.53242 1.63788C3.21019 1.69001 2.93065 1.89539 2.78414 2.18774L2.60145 2.55334C1.81183 4.06653 1.56375 5.61881 1.86441 7.16751C1.97272 7.72636 2.1554 8.28206 2.40663 8.82316C2.17361 8.82855 1.94148 8.89192 1.72778 9.01461C1.21837 9.2901 0.940407 9.9294 1.06467 10.5512L1.07254 10.59L1.084 10.6282C1.45027 11.8576 2.10372 13.02 2.98862 14.0418C2.83807 14.0897 2.69583 14.1611 2.56999 14.2557C2.0599 14.6382 1.8689 15.2802 2.09024 15.859C2.74841 17.7151 3.85465 18.9973 5.44716 19.7382C4.44878 20.0289 3.34861 20.1788 2.09114 20.2006C1.48016 20.2042 0.916363 20.5916 0.686261 21.1671L0.668959 21.2145C0.479305 21.783 0.624017 22.3623 1.06557 22.8043L1.09838 22.8371L1.13455 22.8661C2.99312 24.3633 6.87855 25.2219 11.7943 25.2219C20.4635 25.2219 27.5369 17.6405 27.7133 8.24768C28.7696 7.56277 29.568 6.47158 29.984 5.13187L29.997 5.08491C30.1204 4.591 29.9756 4.04765 29.6285 3.70048Z"
                fill="#233748"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-grow md:justify-evenly gap-20 md:gap-0 my-4 md:mt-0 md:text-center">
          <div className="w-1/2 ">
            <p>
              <Link>Recipes</Link>
            </p>
            <p>
              <Link>Blogs</Link>
            </p>
            <p>Trending</p>
          </div>
          <div className="w-1/2">
            <p>Privacy</p>
            <p>Terms</p>
            <p>Security</p>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-center font-light">
          © Morsel. All rights reserved.
        </h4>
      </div>
    </div>
  );
};

export default Footer;
