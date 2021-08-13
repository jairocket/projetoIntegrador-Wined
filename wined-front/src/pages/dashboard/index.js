import Header from '../../components/Header'
import TopView from '../../components/top-view'
import Brotherhoods from '../../components/brotherhoods'
import Footer from '../../components/Footer'



export default function Dashboard(){

    return(
        <html pt-BR>
            <head>
                <meta charset="UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Dashboard</title>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;1,700&family=Roboto:wght@400;500&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
            </head>
            <body>
                <main>
                    <Header />
                    <TopView />
                    <Brotherhoods />
                    <Footer />

                </main>
            </body>
            


        

        </html>
    )
}

