import "./styles.css"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Button from "../../components/red-button"

import Picture from './assets/images/add-picture.svg'
import Dot from './assets/images/dot.svg'
import Cover from './assets/images/brotherhood-picture.svg'
import Video from './assets/images/add-video.svg'
import Event from './assets/images/event.svg'
import Send from './assets/images/post.svg'


export default function Dashboard(){
    return(
            <body>
                <Header />
                <main>
                    <section className='brotherhood-information'>
                        <div className='brotherhood-cover'>
                            <img src={Cover}id='brotherhood-cover' alt='Foto de background da confraria'/>
                        </div>
                        <div className='brotherhood-settings'>
                            <div className='brotherhood-title'>
                                <h2> Confraria Teste </h2>
                                <div>
                                    <p>Since: Tal ano</p>
                                    <img src={Dot} alt='ponto de separação'/>
                                    <p>Tantos Confrades</p>
                                </div>
                            </div>
                            <div className='brotherhood-description'>
                                <p>Descrição da confraria</p>
                            </div>
                            <div className='brotherhood-menu'>
                                {/* incluir validação para acesso apenas ao chanceler */}
                                <Button 
                                    name='Editar' 
                                    type='button'
                                    className='btn'
                                />
                                <form action="/confraria/editar/delete/<%= brotherhood.id %>/<%= user.id %>?_method=DELETE" method="POST">
                                    <Button 
                                        name='Deixar Confraria' 
                                        type='submit'
                                        className='btn'
                                    />
                                </form>
                            </div>
                            
                        </div>
                    </section>
                    <section className='members'>
                        <h3>Confrades</h3>
                    </section>
                    <section className='events'>
                        <h3>Eventos</h3>
                    </section>
                    <section className='brotherhood-post'>
                        <div className='brotherhood-post-creator'>
                            <div className="brotherhood-post-write">
                                <div className="brotherhood-post-prompt" aria-labelledby="brotherhood-post-write" aria-multiline="true" role="textbox"
                                    contenteditable="true" aria-placeholder="Compartilhe sua experiência">
                                </div>
                            </div>
                            <div className="brotherhood-media-post">
                                <div>
                                    <button type="button" id="p-btn"> 
                                        <img src= {Picture} alt="add-pic"/>Foto
                                    </button>
                                </div>
                                <section className="upload-media-separator"></section>
                                <div>
                                    <a href="/confraria/eventos/<%= brotherhood.id %>" id="event-btn"> 
                                        <img src={Event} alt="add-event"/>Evento
                                    </a>
                                </div>
                                <section className="upload-media-separator"></section>
                                <div>
                                    <button type="button" id="btn"> 
                                        <img src={Video} alt="send-message"/>Vídeo
                                    </button>
                                </div>
                                <div>
                                    <button type="button" id="btn"> 
                                        <img src={Send} alt="send-message"/>Enviar
                                    </button>
                                </div>
                            </div>
                        </div>

                    </section>

                </main>
                <Footer />
            </body>
        
    )
}