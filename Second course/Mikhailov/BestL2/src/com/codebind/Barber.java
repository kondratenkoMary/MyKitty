package com.codebind;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;


public class Barber {
    private List<Integer> customerAr = new ArrayList<>();private int TIME=0;
    private int LastClientTime = 0;
    private int LastRandomTime = 0;
    private int CustomerNum = 0;
    private int currentCustomer = 0;
    private int Tmax;
    private int Tmin;
    private int minRandom;
    private int maxRandom;
    private int STATUS=0;
    private int Nka;
    private int Tka;
    private boolean ClietnHasArrived = false;
    private List<Integer> clientAr = new ArrayList<>();
    Random random = new Random();
    private boolean stopButtonWasPressed;
    private boolean clientHasArrived;

    public void ReadFromFile(){
        int i=0;
        try{
            FileInputStream fstream = new FileInputStream("/home/amishi/BestL/text1.txt");
            BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
            String strLine;
            clientAr.clear();
            while ((strLine = br.readLine()) != null){
                if (!strLine.equals("")) {
                    clientAr.add(Integer.parseInt(strLine));
                    System.out.println(strLine);
                    //тут нужно удалить первую строку
                }

            }

            STATUS = (clientAr.size() == 0) ? 2 : 1;

        }catch (IOException e){
            System.out.println("Ошибка");
            e.printStackTrace();
        }
    }

    private void removeClientFromFile(){
        try(FileWriter writer = new FileWriter("/home/amishi/BestL/text1.txt", false))
        {
            for (int i=0; i<clientAr.size(); i++){
                String toFile = String.valueOf(clientAr.get(i));
                writer.write(toFile);
                writer.write('\n');
                writer.flush();
            }
//            // запись всей строки
//            String text = String.valueOf(CustomerNum);
//            writer.write(text);
//            writer.write('\n');
//            writer.flush();
        }
        catch(IOException ex){

            System.out.println(ex.getMessage());
        }
    }



    public void setTmax (int x){
        Tmax = x;
    }

    public void setTmin (int x){
        Tmin = x;
    }

    public void chooseTRandom(){
        if((Tmax != 0 )&&(Tmin != 0)){
            if (Tmax ==Tmin){
                LastRandomTime = Tmin;
            }
            minRandom = Tmin;
            maxRandom = Tmax;
            int diff = maxRandom - minRandom;
            LastRandomTime = random.nextInt(diff + 1);
            LastRandomTime += minRandom;
        }

    }


    public void clientOnChair (){


        if (STATUS == 3){
            clientHasArrived = false;
            if (TIME == LastClientTime + LastRandomTime){
                if (stopButtonWasPressed){
                    STATUS = 0;
                } else {
                    STATUS = 1;
                }
                stopButtonWasPressed = false;
            }
        }

        if (STATUS == 1 || STATUS == 2){
            ReadFromFile();


            if (STATUS != 2){
                chooseTRandom();
                STATUS = 3;
                LastClientTime = TIME;
                currentCustomer = clientAr.get(0);
                clientAr.remove(0);
                clientHasArrived = true;
                removeClientFromFile();
            }
        }


        if (STATUS != 0) {
            TIME++;
        }

    }


    public int getNka(){
        return Nka;
    }
    public int getTka(){

        return Tka;
    }

    public void setStatus(int z){
        STATUS = z;
    }

    public int getStatus(){
        return STATUS;
    }

    public List<Integer> getClientsArray(){
        return customerAr;
    }

    public int getCurrentClient(){
        return currentCustomer;
    }

    public boolean isClientHasArrived(){
        return clientHasArrived;
    }

    public int getCurrentClientTime(){
        return LastClientTime;
    }

    public void setStopButtonWasPressed(boolean stopButtonWasPressed) {
        this.stopButtonWasPressed = stopButtonWasPressed;
    }

    public int getLastRandomTime() {
        return LastRandomTime;
    }
}
