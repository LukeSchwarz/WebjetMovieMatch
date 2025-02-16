import Card from "../Card/Card";
import "./CardList.css";

interface Props {};

const CardList = (props: Props) => 
{
    return (
        <div>
            <Card Title="Move A" Year="1999" Type="movie" Poster="https://m.media-amazon.com/images/M/MV5BOTIyMDY2NGQtOGJjNi00OTk4LWFhMDgtYmE3M2NiYzM0YTVmXkEyXkFqcGdeQXVyNTU1NTcwOTk@._V1_SX300.jpg"></Card>
            <Card Title="Move A" Year="1999" Type="movie" Poster="https://m.media-amazon.com/images/M/MV5BMTQ0MzI1NjYwOF5BMl5BanBnXkFtZTgwODU3NDU2MTE@._V1._CR93,97,1209,1861_SX89_AL_.jpg_V1_SX300.jpg"></Card>
            <Card Title="Move A" Year="1999" Type="movie" Poster="https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg"></Card>
        </div>
    )
}

export default CardList;
