import React from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md'
import {BiSearch} from 'react-icons/bi'
import {BsChatLeftDotsFill} from 'react-icons/bs'
import {FaRegCalendarAlt} from 'react-icons/fa'
import {HiUser} from 'react-icons/hi'
import bgOne from '../../../../assets/media/images/bg_1.jpg'
import PersonOne from '../../../../assets/media/images/person_1.jpg'
import imageOne from '../../../../assets/media/images/image_1.jpg'
import imageTwo from '../../../../assets/media/images/image_2.jpg'
import imageThree from '../../../../assets/media/images/image_3.jpg'
import imageSeven from '../../../../assets/media/images/image_7.jpg'
import imageEight from '../../../../assets/media/images/image_8.jpg'



function BlogDetails() {
  return (
    <>
    <section className="hero-wrap hero-wrap-2 ftco-degree-bg js-fullheight" style={{ backgroundImage: `url(${bgOne})` }} data-stellar-background-ratio="0.5">
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
          <div className="col-md-9 pb-5 text-center">
          	<p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></a></span> <span className="mr-2"><a href="blog.html">Blog <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></a></span> <span>Blog Single <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></span></p>
            <h1 className="mb-3 bread">Our Blog</h1>
          </div>
        </div>
      </div>
    </section>

		<section className="ftco-section ftco-degree-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-8 order-md-last">
            <h2 className="mb-3">It is a long established fact a reader be distracted</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eius mollitia suscipit, quisquam doloremque distinctio perferendis et doloribus unde architecto optio laboriosam porro adipisci sapiente officiis nemo accusamus ad praesentium? Esse minima nisi et. Dolore perferendis, enim praesentium omnis, iste doloremque quia officia optio deserunt molestiae voluptates soluta architecto tempora.</p>
            <p>
              <img src={imageSeven} loading='lazy' alt="" className="img-fluid"/>
            </p>
            <p>Molestiae cupiditate inventore animi, maxime sapiente optio, illo est nemo veritatis repellat sunt doloribus nesciunt! Minima laborum magni reiciendis qui voluptate quisquam voluptatem soluta illo eum ullam incidunt rem assumenda eveniet eaque sequi deleniti tenetur dolore amet fugit perspiciatis ipsa, odit. Nesciunt dolor minima esse vero ut ea, repudiandae suscipit!</p>
            <h2 className="mb-3 mt-5">#2. Creative WordPress Themes</h2>
            <p>Temporibus ad error suscipit exercitationem hic molestiae totam obcaecati rerum, eius aut, in. Exercitationem atque quidem tempora maiores ex architecto voluptatum aut officia doloremque. Error dolore voluptas, omnis molestias odio dignissimos culpa ex earum nisi consequatur quos odit quasi repellat qui officiis reiciendis incidunt hic non? Debitis commodi aut, adipisci.</p>
            <p>
              <img src={imageEight} loading='lazy' alt="" className="img-fluid"/>
            </p>
            <p>Quisquam esse aliquam fuga distinctio, quidem delectus veritatis reiciendis. Nihil explicabo quod, est eos ipsum. Unde aut non tenetur tempore, nisi culpa voluptate maiores officiis quis vel ab consectetur suscipit veritatis nulla quos quia aspernatur perferendis, libero sint. Error, velit, porro. Deserunt minus, quibusdam iste enim veniam, modi rem maiores.</p>
            <p>Odit voluptatibus, eveniet vel nihil cum ullam dolores laborum, quo velit commodi rerum eum quidem pariatur! Quia fuga iste tenetur, ipsa vel nisi in dolorum consequatur, veritatis porro explicabo soluta commodi libero voluptatem similique id quidem? Blanditiis voluptates aperiam non magni. Reprehenderit nobis odit inventore, quia laboriosam harum excepturi ea.</p>
            <p>Adipisci vero culpa, eius nobis soluta. Dolore, maxime ullam ipsam quidem, dolor distinctio similique asperiores voluptas enim, exercitationem ratione aut adipisci modi quod quibusdam iusto, voluptates beatae iure nemo itaque laborum. Consequuntur et pariatur totam fuga eligendi vero dolorum provident. Voluptatibus, veritatis. Beatae numquam nam ab voluptatibus culpa, tenetur recusandae!</p>
            <p>Voluptas dolores dignissimos dolorum temporibus, autem aliquam ducimus at officia adipisci quasi nemo a perspiciatis provident magni laboriosam repudiandae iure iusto commodi debitis est blanditiis alias laborum sint dolore. Dolores, iure, reprehenderit. Error provident, pariatur cupiditate soluta doloremque aut ratione. Harum voluptates mollitia illo minus praesentium, rerum ipsa debitis, inventore?</p>
            <div className="tag-widget post-tag-container mb-5 mt-5">
              <div className="tagcloud">
                <a href="#" className="tag-cloud-link">Life</a>
                <a href="#" className="tag-cloud-link">Sport</a>
                <a href="#" className="tag-cloud-link">Tech</a>
                <a href="#" className="tag-cloud-link">Travel</a>
              </div>
            </div>
            
            <div className="about-author d-flex p-4 bg-light">
              <div className="bio mr-5">
                <img src={PersonOne} loading='lazy' alt="Image placeholder" className="img-fluid mb-4"/>
              </div>
              <div className="desc">
                <h3>George Washington</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos fugit cupiditate numquam!</p>
              </div>
            </div>


            <div className="pt-5 mt-5">
              <h3 className="mb-5">6 Comments</h3>
              <ul className="comment-list">
                <li className="comment">
                  <div className="vcard bio">
                    <img src={PersonOne} loading='lazy' alt="Image placeholder"/>
                  </div>
                  <div className="comment-body">
                    <h3>John Doe</h3>
                    <div className="meta">October 03, 2018 at 2:21pm</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                    <p><a href="#" className="reply">Reply</a></p>
                  </div>
                </li>

                <li className="comment">
                  <div className="vcard bio">
                    <img src={PersonOne} loading='lazy' alt="Image placeholder"/>
                  </div>
                  <div className="comment-body">
                    <h3>John Doe</h3>
                    <div className="meta">October 03, 2018 at 2:21pm</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                    <p><a href="#" className="reply">Reply</a></p>
                  </div>

                  <ul className="children">
                    <li className="comment">
                      <div className="vcard bio">
                        <img src={PersonOne} loading='lazy' alt="Image placeholder"/>
                      </div>
                      <div className="comment-body">
                        <h3>John Doe</h3>
                        <div className="meta">October 03, 2018 at 2:21pm</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                        <p><a href="#" className="reply">Reply</a></p>
                      </div>


                      <ul className="children">
                        <li className="comment">
                          <div className="vcard bio">
                            <img src={PersonOne} loading='lazy' alt="Image placeholder"/>
                          </div>
                          <div className="comment-body">
                            <h3>John Doe</h3>
                            <div className="meta">October 03, 2018 at 2:21pm</div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                            <p><a href="#" className="reply">Reply</a></p>
                          </div>

                            <ul className="children">
                              <li className="comment">
                                <div className="vcard bio">
                                  <img src={PersonOne} loading='lazy' alt="Image placeholder"/>
                                </div>
                                <div className="comment-body">
                                  <h3>John Doe</h3>
                                  <div className="meta">October 03, 2018 at 2:21pm</div>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                  <p><a href="#" className="reply">Reply</a></p>
                                </div>
                              </li>
                            </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li className="comment">
                  <div className="vcard bio">
                    <img src={PersonOne} loading='lazy' alt="Image placeholder"/>
                  </div>
                  <div className="comment-body">
                    <h3>John Doe</h3>
                    <div className="meta">October 03, 2018 at 2:21pm</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                    <p><a href="#" className="reply">Reply</a></p>
                  </div>
                </li>
              </ul>
              
              <div className="comment-form-wrap pt-5">
                <h3 className="mb-5">Leave a comment</h3>
                <form action="#" className="p-5 bg-light">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" className="form-control" id="name"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" className="form-control" id="email"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="url" className="form-control" id="website"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea name="" id="message" cols="30" rows="10" className="form-control"></textarea>
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Post Comment" className="btn py-3 px-4 btn-primary"/>
                  </div>

                </form>
              </div>
            </div>

          </div>
          <div className="col-md-4 sidebar">
            <div className="sidebar-box">
              <form action="#" className="search-form">
                <div className="form-group">
                  <span className="icon icon-search"><BiSearch/></span>
                  <input type="text" className="form-control" placeholder="Type a keyword and hit enter"/>
                </div>
              </form>
            </div>
            <div className="sidebar-box">
              <div className="categories">
                <h3>Categories</h3>
                <li><a href="#">Jobs <span>(12)</span></a></li>
                <li><a href="#">Visual Assistant <span>(22)</span></a></li>
                <li><a href="#">Coffee <span>(37)</span></a></li>
                <li><a href="#">Drinks <span>(42)</span></a></li>
                <li><a href="#">Foods <span>(14)</span></a></li>
                <li><a href="#">Travel <span>(140)</span></a></li>
              </div>
            </div>

            <div className="sidebar-box">
              <h3>Recent Blog</h3>
              <div className="block-21 mb-4 d-flex">
                <a className="blog-img mr-4" style={{ backgroundImage: `url(${imageOne})` }}></a>
                <div className="text">
                  <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
                  <div className="meta">
                    <div><a href="#"><span className="icon-calendar five-margin-icon"><FaRegCalendarAlt/></span> July 12, 2018</a></div>
                    <div><a href="#"><span className="icon-person five-margin-icon"><HiUser/></span> Admin</a></div>
                    <div><a href="#"><span className="icon-chat"><BsChatLeftDotsFill/></span> 19</a></div>
                  </div>
                </div>
              </div>
              <div className="block-21 mb-4 d-flex">
                <a className="blog-img mr-4" style={{ backgroundImage: `url(${imageTwo})` }}></a>
                <div className="text">
                  <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
                  <div className="meta">
                    <div><a href="#"><span className="icon-calendar five-margin-icon"><FaRegCalendarAlt/></span> July 12, 2018</a></div>
                    <div><a href="#"><span className="icon-person five-margin-icon"><HiUser/></span> Admin</a></div>
                    <div><a href="#"><span className="icon-chat"><BsChatLeftDotsFill/></span> 19</a></div>
                  </div>
                </div>
              </div>
              <div className="block-21 mb-4 d-flex">
                <a className="blog-img mr-4" style={{ backgroundImage: `url(${imageThree})` }}></a>
                <div className="text">
                  <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
                  <div className="meta">
                    <div><a href="#"><span className="icon-calendar five-margin-icon"><FaRegCalendarAlt/></span> July 12, 2018</a></div>
                    <div><a href="#"><span className="icon-person five-margin-icon"><HiUser/></span> Admin</a></div>
                    <div><a href="#"><span className="icon-chat"><BsChatLeftDotsFill/></span> 19</a></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-box">
              <h3>Tag Cloud</h3>
              <div className="tagcloud">
                <a href="#" className="tag-cloud-link">dish</a>
                <a href="#" className="tag-cloud-link">menu</a>
                <a href="#" className="tag-cloud-link">food</a>
                <a href="#" className="tag-cloud-link">sweet</a>
                <a href="#" className="tag-cloud-link">tasty</a>
                <a href="#" className="tag-cloud-link">delicious</a>
                <a href="#" className="tag-cloud-link">desserts</a>
                <a href="#" className="tag-cloud-link">drinks</a>
              </div>
            </div>

            <div className="sidebar-box">
              <h3>Paragraph</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos fugit cupiditate numquam!</p>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  )
}

export default BlogDetails