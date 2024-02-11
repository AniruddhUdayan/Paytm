import React,{useState} from "react";
import axios from "axios";

const SendMoneyModal = ({ isOpen, onClose, children,id }) => {
    const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
    const handleSendMoney = async () => {
        if (amount.trim() === '' || !id) return;
    
        setIsSending(true); 
        try {
          const token = localStorage.getItem("token"); 
          const username = localStorage.getItem("email"); 
          const response = await axios.post(
            "https://paytm-wh8p.onrender.com/api/v1/account/transfer",
            {
              amount: parseFloat(amount),
              to: id,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
                username:username
              },
            }
          );
          console.log(response.data); // Handle success
          onClose(); // Optionally close modal on success
        } catch (error) {
          console.error("Error sending money:", error);
        } finally {
          setIsSending(false); // Reset sending state
        }
      };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg flex flex-col gap-4">
        <div className="text-[20px] font-sans font-[700]">Send Money To Friend</div>
        <div>{children}</div>
        <input
          className="p-[10px]  border rounded-md"
          placeholder="enter amount"
         type="number"
         value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isSending}
        />
        <div className="flex flex-row justify-evenly">
          <button
            className="mt-4 px-4 py-2 bg-gray-200 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
          <button  onClick={handleSendMoney}
            disabled={amount.trim() === '' || isSending} className="mt-4 px-4 py-2 bg-gray-200 rounded-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyModal;
