package com.codebind;

import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class Main {
    private JPanel panelMain;
    private JTable table1;
    private static Barber globalBarber = null;

    public static void main(String[] args) {
        JFrame frame = new JFrame("Main");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLocationRelativeTo(null);

        // Setting layouts
        GridBagLayout mainLayout = new GridBagLayout();
        frame.setLayout(mainLayout);


        JPanel panel = (JPanel) frame.getContentPane();
        GridBagConstraints q = new GridBagConstraints();

        JLabel labelBarber = new JLabel();
        ArrayList<JLabel> arrayOfPic = new ArrayList<JLabel>();
        q.anchor = GridBagConstraints.LINE_START;
        q.gridx = 0;
        q.gridy = 0;
        labelBarber.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 200, 200));
        panel.add(labelBarber);
        arrayOfPic.add(labelBarber);

        JLabel labelBed = new JLabel();
        q.anchor = GridBagConstraints.LINE_START;
        q.gridx = 1;
        q.gridy = 0;
        labelBed.setIcon(getScaledImage("/home/amishi/bed.jpg", 270, 170));
        panel.add(labelBed);
        arrayOfPic.add(labelBed);

        DefaultTableModel model = new DefaultTableModel();
        JTable peopleTable = new JTable(model);

        model.addColumn("");
        model.addRow(new Object[]{"Nka"});
        model.addRow(new Object[]{"Tka"});

//        for (int i=0; i<50; i++){
//            model.addColumn("");
//            model.setValueAt(i, 0, i+1); //znachenie vmesto i esli chto dura
//            model.setValueAt(i, 1, i+1);
//        }


        JScrollPane peopleTableScrolPage = new JScrollPane(peopleTable);
        peopleTable.setAutoResizeMode(JTable.AUTO_RESIZE_OFF);
        peopleTableScrolPage.setPreferredSize(new Dimension(200, 60));
        frame.add(peopleTableScrolPage, new GridBagConstraints(0, 1, 1, 1, 1, 1,
                GridBagConstraints.NORTHWEST, GridBagConstraints.NONE,
                new Insets(1, 1, 1, 1), 0, 0));
        // peopleTable.setSize(200,50);


        JLabel label1 = new JLabel("TprMax");
        //GridBagConstraints c = new GridBagConstraints();
        q.anchor = GridBagConstraints.LINE_START;
        q.gridx = 0;
        q.gridy = 2;
        frame.add(label1, q);

        SpinnerModel sm = new SpinnerNumberModel(1, 1, 10000, 1); //default value,lower bound,upper bound,increment by
        JSpinner spinner1 = new JSpinner(sm);

        int vue1 = 2;
        q.anchor = GridBagConstraints.CENTER;
        q.gridx = 0;
        q.gridy = 2;
        spinner1.setValue(vue1);
        frame.add(spinner1, q);

        JLabel label2 = new JLabel("TprMin");
        q.anchor = GridBagConstraints.LINE_START;
        q.gridx = 0;
        q.gridy = 3;
        frame.add(label2, q);

        SpinnerModel sm2 = new SpinnerNumberModel(1, 1, 10000, 1); //default value,lower bound,upper bound,increment by
        int vue2= 1;
        JSpinner spinner2 = new JSpinner(sm2);
        spinner2.setValue(vue2);
        q.anchor = GridBagConstraints.CENTER;
        q.gridx = 0;
        q.gridy = 3;
        frame.add(spinner2, q);


        // spinner check for TMax > Tmin always
        spinner1.addChangeListener(new ChangeListener() {
            @Override
            public void stateChanged(ChangeEvent e) {
                int TMax = (Integer) spinner1.getValue();
                int TMin = (Integer) spinner2.getValue();
                if (TMax < TMin){
                    spinner1.setValue(spinner2.getValue());
                }
            }

        });

        spinner2.addChangeListener(new ChangeListener() {
            @Override
            public void stateChanged(ChangeEvent e) {
                int TMax = (Integer) spinner1.getValue();
                int TMin = (Integer) spinner2.getValue();
                if (TMax < TMin){
                    spinner2.setValue(spinner1.getValue());
                }
            }

        });


        //button add
        JButton button1 = new JButton("START");
        button1.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                globalBarber.setStatus(1);
            }
        });
        q.anchor = GridBagConstraints.LINE_START;
        q.gridx = 0;
        q.gridy = 4;
        frame.add(button1, q);

        JButton button2 = new JButton("PAUSE");
        button2.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                globalBarber.setStopButtonWasPressed(true);
            }
        });
        q.anchor = GridBagConstraints.LINE_START;
        q.gridx = 1;
        q.gridy = 4;
        frame.add(button2, q);

        JButton button3 = new JButton("EXIT");
        button3.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });
        q.anchor = GridBagConstraints.LINE_START;
        q.gridx = 2;
        q.gridy = 4;
        frame.add(button3, q);


        frame.pack();
        frame.setVisible(true);

        Barber barber = new Barber();
        globalBarber = barber;
        setTimer(barber, model, spinner1, spinner2, labelBarber, labelBed);
    }

    private static ImageIcon getScaledImage(String path, int x, int y) {
        ImageIcon imageIcon = new ImageIcon(path); // load the image to a imageIcon
        Image image = imageIcon.getImage(); // transform it
        Image newimg = image.getScaledInstance(x, y, java.awt.Image.SCALE_SMOOTH); // scale it the smooth way
        imageIcon = new ImageIcon(newimg);

        return imageIcon;
    }

    private static void setTimer(Barber barber, DefaultTableModel model, JSpinner spinner1, JSpinner spinner2, JLabel labelBarber, JLabel labelBed) {
        // set timer
        java.util.Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                // Your database code here
                doStuff(barber, model, spinner1, spinner2, labelBarber, labelBed); // into timer and do this function every 1000ms
            }
        }, 0, 1000);

    }



    private static void doStuff(Barber barber, DefaultTableModel model, JSpinner spinner1, JSpinner spinner2, JLabel labelBarber, JLabel labelBed) {
        int value1 = (Integer) spinner1.getValue();
        int value2 = (Integer) spinner2.getValue();
        barber.setTmax(value1);
        barber.setTmin(value2);
        barber.clientOnChair();
        if (globalBarber.getStatus() == 0){
            labelBarber.setIcon(getScaledImage("/home/amishi/barberwait.jpg", 200,200));
            labelBed.setIcon(getScaledImage("/home/amishi/bed.jpg", 270,170));
        }
        if (globalBarber.getStatus() == 1){
            labelBarber.setIcon(getScaledImage("/home/amishi/barberwait.jpg", 200,200));
            labelBed.setIcon(getScaledImage("/home/amishi/bed.jpg", 270,170));

        }
        if (globalBarber.getStatus() == 2){
            labelBarber.setIcon(getScaledImage("/home/amishi/barberwait.jpg", 200,200));
            labelBed.setIcon(getScaledImage("/home/amishi/slep.jpg", 270,170));

        }
        if (globalBarber.getStatus() == 3){
            labelBarber.setIcon(getScaledImage("/home/amishi/barberwork.jpg", 200,200));
            labelBed.setIcon(getScaledImage("/home/amishi/bed.jpg", 270,170));

        }
        if (barber.isClientHasArrived()) {
            model.addColumn("", new Object[]{barber.getCurrentClient(), barber.getLastRandomTime()});
        }

    }

}
