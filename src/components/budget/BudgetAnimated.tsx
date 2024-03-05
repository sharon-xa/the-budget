import { useState } from "react"

const BudgetAnimated = () => {
    const [image, setImage] = useState("/pig.apng");
    return (
        <div
            onClick={() => setImage(prev => prev === "/public/pig.apng" ? "/public/pig-2.apng" : "/public/pig.apng")}
            className="cursor-pointer"
        >
            <img src={image} alt="" width={400} height={400} />
        </div>
    )
}

export default BudgetAnimated;
