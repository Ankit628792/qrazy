import { MessageSquareText } from 'lucide-react'
import SupportCard from './SupportCard'

function Feedback() {
    return (
        <SupportCard
            title="Feedback"
            description="How is your experience with our platform? We value your feedback!"
            icon={MessageSquareText}
            buttonText="Write here!"
        />
    )
}

export default Feedback