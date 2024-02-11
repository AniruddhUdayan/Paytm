import React, { useEffect, useState } from "react";
import axios from "axios";
import SendMoneyModal from "./SendMoneyModal";

const BalanceCard = ({ user }) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balanceCheck, setBalanceCheck] = useState(false);
  const [friends, setFriends] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectId , setSelectedId] = useState(null)

  const toggleModal = (friend = null) => {
    setSelectedFriend(friend); 
    setSelectedId(friend?._id)
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim() === "") {
      fetchFriends();
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/user/bulk?filter=${encodeURIComponent(
          value
        )}`
      );
      const data = await response.json();
      
      // console.log(extractedFirstNames)
      setFriends(data.user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const response = await axios.get(
        "http://localhost:3001/api/v1/account/balance",
        {
          headers: {
            authorization: `Bearer ${token}`,
            username: `${email}`,
          },
        }
      );
      console.log(response);
      setBalance(response.data.balance);
      setBalanceCheck(true);
    } catch (error) {
      console.log("Error fetching balance:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const response = await axios.get(
        "http://localhost:3001/api/v1/user/friends",
        {
          headers: {
            authorization: `Bearer ${token}`,
            username: `${email}`,
          },
        }
      );
      const friends = response.data;
      setFriends(friends);
      console.log(friends)  
    } catch (error) {
      console.error("Error fetching friends:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[500px] w-[330px] sm:w-[400px] bg-white rounded-xl shadow-lg flex flex-col p-[10px] sm:gap-8">
      <div
        className="p-[10px] text-[18px] sm:text-[25px] font-mono font-semibold cursor-pointer"
        onClick={fetchBalance}
      >
        Your Balance{" "}
        {balanceCheck && <span>- रु {Number(balance).toFixed(2)}</span>}
      </div>
      <div className="flex flex-col gap-4">
        <div className="p-[10px] text-[25px] font-mono font-semibold ">
          Friends
        </div>
        <input
          className="p-[10px]  border rounded-md"
          placeholder="Search for friends..."
          onChange={handleInputChange}
        />
        <div
          className="custom-scrollbar p-[10px] text-[20px] font-mono border flex flex-col gap-4 rounded-md max-h-[285px] sm:max-h-[250px] overflow-y-scroll overflow-x-hidden"
          style={{ backgroundImage: `url('/images/Background.png')` }}
        >
          {friends.map((friend, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center"
            >
              <div>{friend.firstName}</div>
              <button
                onClick={() => toggleModal(friend)}
                className="text-[15px] font-sans font-[700] border p-2 rounded-md border-blue-500"
              >
                Send Money
              </button>
            </div>
          ))}
        </div>
      </div>
      <SendMoneyModal isOpen={isModalOpen} onClose={() => toggleModal()} id={selectId}>
        <div>
         {selectedFriend ? selectedFriend.firstName : "Select a friend"}
        </div>
      </SendMoneyModal>
    </div>
  );
};

export default BalanceCard;
