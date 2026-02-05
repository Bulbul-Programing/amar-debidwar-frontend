import React from 'react';

const AccountsHeader = () => {
    return (
        <header className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8 text-center shadow-lg">
            <h1 className="text-3xl sm:text-4xl font-bold">বাজেট ও তহবিলের স্বচ্ছতা</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl">
                বিভিন্ন তহবিল থেকে প্রাপ্ত বাজেট ও তার ব্যবহার সহজে দেখুন
            </p>
        </header>
    );
};

export default AccountsHeader;