import React from "react";
import "./styles.css";

export default function SubscriptionForm() {
  return (
    <div className="form-container">
      <form
        action="https://redcross.us11.list-manage.com/subscribe/post?u=0b6a90af21e93c49fb45e4ad1&amp;id=cb6194360a&amp;f_id=003b99e0f0"
        method="post"
        target="_self"
      >
        <h2 style={{ color: "white" }}>Subscribe to our newsletter</h2>
        <div className="name-fields">
          <input type="text" name="FNAME" className="" placeholder="First Name"  id="mce-FNAME" />
          <input type="text" name="LNAME" className="" placeholder="Last Name" id="mce-LNAME" />
        </div>
        <input
          type="email"
          name="EMAIL"
          className="required email"
          id="mce-EMAIL"
          placeholder="Email Address"
          required
        />
        <br />
        <button type="submit" className="btn">
          Subscribe
        </button>
      </form>
    </div>
  );
}
