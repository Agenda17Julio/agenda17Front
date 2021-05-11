import log from '../../../img/log.svg'

const SigninScreen = () => {
    return <section className='signin_section_main_contenedor'>

        <div className="signin_section_container">
            <div className="signin_section_container_forms-container">
                <div className="signin_section_container_forms-container_signin-signup">
                    <form className="section_signin_form">
                        <h2 className="section_signin_form_title">Logearse</h2>
                        <div className="section_signin_form_input-field">
                            <span className="material-icons">
                                person</span>
                            <input type="text" name="email" placeholder="Username" />
                        </div>
                        <div className="section_signin_form_input-field">
                            <span className="material-icons">
                                vpn_key</span>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        <input type="submit" value="Iniciar Sesion" className="section_signin_form btn solid" />


                    </form>
                </div>
            </div>
        </div>

        <div className="signin_section_2_panels-container">
            <div className="section_panelAuth section_left-panelAuth">
                <div className="section_panelAuth_contenido">
                    <h3>Hey cómo estas?</h3>
                    <p>Recuerda en caso de perdida de contraseñas el departamento de informática sera de mucha ayuda!</p>
                </div>
                <img src={log} className="signin_section_2_panels-container_image" alt="" />
            </div>

          

        </div>



    </section>
}

export default SigninScreen;